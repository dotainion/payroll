import React, { useCallback, useEffect, useRef, useState } from "react";
import { FcTodoList } from "react-icons/fc";
import { FiAlertTriangle } from "react-icons/fi";
import { IoMdAlert } from "react-icons/io";
import { MdFileDownloadDone, MdPending } from "react-icons/md";
import { Dropdown } from 'react-bootstrap';
import { api } from "../request/Api";
import { useAuth } from "../auth/AuthProvider";
import $ from 'jquery';
import { DateHelper } from "../utils/DateHelper";
import { Loading } from "../components/Loading";
import { ErrorResponseHandler } from "../utils/ErrorResponseHandler";
import { toast } from "../utils/Toast";
import { EllipsisOption } from "../widgets/EllipsisOption";
import { BsFilterRight } from "react-icons/bs";

export const TodoList = () =>{
    const { user } = useAuth();

    const [openTodoCreate, setOpenTodoCreate] = useState(false);
    const [openAssignTo, setOpenAssignTo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessge] = useState();
    const [members, setMembers] = useState([]);
    const [assignTodoData, setAssignTotoData] = useState();
    const [todos, setTodos] = useState([]);
    
    const idRef = useRef();
    const assignToIdRef = useRef(null);
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueRef = useRef();

    const assignTodoIdRef = useRef();
    const dropdownNameRef = useRef();
    const dropdownName2Ref = useRef();

    const setTodo = () =>{
        if(!dueRef.current?.valueAsDate){
            return setErrorMessge('Due date is required.');
        }
        if(!titleRef.current.value){
            return setErrorMessge('A title is required.');
        }
        setLoading(true);
        setErrorMessge(null);
        const data = {
            id: idRef.current.value,
            userId: user?.id,
            assignToId: assignToIdRef.current,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            due: new DateHelper(dueRef.current.valueAsDate).toSqlString()
        }

        api.todo.set(data).then((response)=>{
            const todo = response.data.data[0];
            const extodo = todos.find((t)=>t.id === todo.id);
            if(!extodo) setTodos((tos)=>[todo, ...tos]);
            else setTodos((tos)=>{
                let lTodos = [];
                tos.forEach((to)=>{
                    if(to.id === todo.id) lTodos.push(todo);
                    else lTodos.push(to);
                });
                return lTodos;
            });
            setOpenTodoCreate(false);
        }).catch((error)=>{
            setErrorMessge(new ErrorResponseHandler().message(error));
        }).finally(()=>{
            setLoading(false);
        });
    }

    const deleteTodo = useCallback((e, todo) =>{
        setLoading(true);
        const target = e.target;
        api.todo.delete(todo.id).then((response)=>{
            $(target).parent().parent().parent().parent().hide('fast').promise().then((card)=>{
                $(card).remove();
            });
        }).catch((error)=>{
            toast.error('Delete Todo', error);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const completeTodo = useCallback((todo) =>{
        setLoading(true);
        api.todo.complete(todo.id).then((response)=>{
            const ttDo = response.data.data[0];
            setTodos((tos)=>{
                let lTodos = [];
                tos.forEach((to)=>{
                    if(to.id === ttDo.id) lTodos.push(ttDo);
                    else lTodos.push(to);
                });
                return lTodos;
            });
        }).catch((error)=>{
            toast.error('Complete Todo', error);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const incompleteTodo = useCallback((todo) =>{
        setLoading(true);
        api.todo.incomplete(todo.id).then((response)=>{
            const ttDo = response.data.data[0];
            setTodos((tos)=>{
                let lTodos = [];
                tos.forEach((to)=>{
                    if(to.id === ttDo.id) lTodos.push(ttDo);
                    else lTodos.push(to);
                });
                return lTodos;
            });
        }).catch((error)=>{
            toast.error('Incomplete Todo', error);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const assignTo = useCallback(() =>{
        if(!assignTodoIdRef.current || !assignToIdRef.current) return;
        setLoading(true);
        api.todo.assignTo(assignTodoIdRef.current, assignToIdRef.current).then((response)=>{
            const ttDo = response.data.data[0];
            setTodos((tos)=>{
                let lTodos = [];
                tos.forEach((to)=>{
                    if(to.id === ttDo.id) lTodos.push(ttDo);
                    else lTodos.push(to);
                });
                return lTodos;
            });
            setOpenAssignTo(false);
        }).catch((error)=>{
            toast.error('Incomplete Todo', error);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const updateDropdown = useCallback((member) =>{
        assignToIdRef.current = member.id;
        $(dropdownNameRef.current).text(member.attributes.name);
        $(dropdownName2Ref.current).text(member.attributes.name);
    }, []);

    const clearDropdownNames = useCallback(() =>{
        $(dropdownNameRef.current).text('');
        $(dropdownName2Ref.current).text('');
    }, []);

    const showTodoCreate = useCallback(() =>{
        clearDropdownNames();
        setOpenAssignTo(false);
        setOpenTodoCreate(true);
    }, []);

    const showAssignTo = useCallback((todo) =>{
        assignTodoIdRef.current = todo.id;
        setAssignTotoData(todo);
        clearDropdownNames();
        setOpenTodoCreate(false);
        setOpenAssignTo(true);
    }, []);

    const closeTodoCreate = useCallback((e) =>{
        if(e.target !== e.currentTarget) return;
        setOpenTodoCreate(false);
    }, []);

    const closeAssignTo = useCallback((e) =>{
        if(e.target !== e.currentTarget) return;
        setOpenAssignTo(false);
    }, []);

    const focusOutOfOverlay = () =>{
        $(document.body).trigger('click');
    }

    const editTodo = useCallback((todo)=>{
        idRef.current.value = todo.id;
        if(todo.attributes.assignToId){
            assignToIdRef.current.value = todo.attributes.assignToId;
            updateDropdown(todo.attributes.userAssign);
        }
        titleRef.current.value = todo.attributes.title;
        descriptionRef.current.value = todo.attributes.description;
        dueRef.current.value = new DateHelper().sqlStringToInput(todo.attributes.due);
        setOpenTodoCreate(true);
    }, []);

    const apiFetchTodo = (value) =>{
        let data = {userId: user?.id, value};
        api.todo.listByUser(data).then((response)=>{
            setTodos(response.data.data);
        }).catch((error)=>{
            setTodos([]);
        });
    }

    useEffect(()=>{
        api.user.listUsers().then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{

        });
        apiFetchTodo('all');
    }, []);

    return(
        <div className="container">
            <div className="h4 mt-3">Todos</div>
            <div className="d-flex align-items-center mb-3 border-bottom border-secondary pb-3">
                <button onClick={showTodoCreate} className="btn btn-sm btn-dark me-2">New Todo</button>
                <div className="btn btn-sm bg-dark d-flex align-items-center p-0">
                    <BsFilterRight className="text-light fs-3 my-0 mx-1" />
                    <span className="text-light me-2">Filter</span>
                    <select onChange={(e)=>apiFetchTodo(e.target.value)} className="btn btn-sm btn-dark shadow-none border-0 text-start rounded-start-0 my-0">
                        <option value={'all'}>All</option>
                        <option value={'completed'}>Completed</option>
                        <option value={'overDue'}>Over Due</option>
                        <option value={'pending'}>Pending</option>
                        <option value={'assignToMe'}>Assign to me</option>
                        <option value={'createdByMe'}>Created by me</option>
                    </select>
                </div>
            </div>
            <div className="row">
                {
                    todos.length?
                    todos.map((todo, key)=>(
                        <div className="d-inline-block bg-white shadow-sm rounded-5 py-2 m-2 px-4" style={{width: '400px'}} key={key}>
                            <div className="w-100">
                                <div className={`d-flex align-items-center w-100 small ${todo.attributes.isPending || todo.attributes.isDone ? 'text-success' : ''} ${todo.attributes.isUpComming ? 'text-warning' : ''} ${todo.attributes.isOverdue ? 'text-danger' : ''} mb-1`}>
                                    <div className="d-flex me-2">
                                        {todo.attributes.isOverdue ? <IoMdAlert className="text-danger fs-1"/> : null}
                                        {todo.attributes.isUpComming ? <FiAlertTriangle className="text-warning fs-1"/> : null}
                                        {todo.attributes.isPending ? <MdPending className="text-success fs-1"/> : null}
                                        {todo.attributes.isDone ? <MdFileDownloadDone className="text-success fs-1"/> : null}
                                    </div>
                                    {todo.attributes.isOverdue ? <small className="text-nowrap text-danger ms-2">Overdue</small> : null}
                                    {todo.attributes.isUpComming ? <small className="text-nowrap text-warning ms-2">Upcoming</small> : null}
                                    {todo.attributes.isDone ? <small className="text-nowrap text-success ms-2">Done</small> : null}
                                    {todo.attributes.isPending ? <small className="text-nowrap text-success ms-2">Pending</small> : null}
                                    <div className="text-end w-100" onClick={focusOutOfOverlay}>
                                        <EllipsisOption>
                                            <div>
                                                <button onClick={()=>showAssignTo(todo)} className="btn btn-light w-100 rounded-0 border-start-0 border-end-0">Assign To {todo.attributes.userAssign?.attributes?.name}</button>
                                                {
                                                    todo.attributes.isDone ? 
                                                        <button onClick={()=>incompleteTodo(todo)} className="btn btn-light w-100 rounded-0 border-start-0 border-end-0">Mark as incomplete</button>
                                                        : <button onClick={()=>completeTodo(todo)} className="btn btn-light w-100 rounded-0 border-start-0 border-end-0">Mark as complete</button>
                                                }
                                                <button onClick={(e)=>deleteTodo(e, todo)} className="btn btn-light w-100 rounded-0 border-start-0 border-end-0">Delete</button>
                                                <button onClick={()=>editTodo(todo)} className="btn btn-light w-100 rounded-0 border-start-0 border-end-0">Edit</button>
                                            </div>
                                        </EllipsisOption>
                                        
                                    </div>
                                </div>
                                <small className="fw-bold">{todo.attributes.title}</small>
                                <div className="small">{todo.attributes.description}</div>
                                <div className="small"><small>{new Date(todo.attributes.due).toDateString()}</small></div>
                            </div>
                        </div>
                    )):
                    <div className="d-flex align-items-center">
                        <FcTodoList className="display-5 me-3" />
                        <div className="fw-bold">No records</div>
                    </div>
                }
            </div>
            <div className="backdrop top-0" hidden={!openTodoCreate}>
                <div onClick={closeTodoCreate} className="d-flex align-items-center justify-content-center w-100 h-100">
                    <div className="shadow rounded-3 bg-white p-4 set-todo-overlay-size">
                        <div className="mb-3">
                            <div className="d-flex align-items-center border-bottom border-3 pb-2 h4"><FcTodoList className="me-2" />Create new todo</div>
                            {errorMessage ? <div className="text-danger my-2">{errorMessage}</div> : null}
                            <div className="my-2">
                                <div className="fw-bold">Due on</div>
                                <input ref={dueRef} className="form-control shadow-none form-select" type="date"/>
                            </div>
                            <div className="my-2">
                                <div className="fw-bold">Title</div>
                                <input ref={titleRef} className="form-control shadow-none" />
                            </div>
                            <div className="my-2">
                                <div className="fw-bold">Description</div>
                                <textarea ref={descriptionRef} className="form-control shadow-none" style={{height: '150px', resize: 'none'}} />
                            </div>
                        </div>
                        <Dropdown size="sm">
                            <Dropdown.Toggle className="btn btn-sm bg-white text-primary border shadow-sm me-2">Assign To <span ref={dropdownNameRef}></span></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div className="overflow-auto" style={{maxHeight: '300px'}}>
                                    {
                                        members.length?
                                        members.map((member, key)=>(
                                            <Dropdown.Item onClick={(e)=>updateDropdown(member)} as="button" key={key}>{member.attributes.name}</Dropdown.Item>
                                        )):<div className="px-3 small text-center text-white bg-primary">No Records</div>
                                    }
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="mt-4">
                            <button onClick={setTodo} className="btn btn-sm btn-outline-primary px-3 me-2" disabled={loading}>Save</button>
                            <button onClick={()=>setOpenTodoCreate(false)} className="btn btn-sm btn-outline-primary px-3">Close</button>
                        </div>
                        <input ref={idRef} hidden />
                    </div>
                </div>
            </div>
            <div className="backdrop top-0" hidden={!openAssignTo}>
                <div onClick={closeAssignTo} className="d-flex align-items-center justify-content-center w-100 h-100">
                    <div className="shadow rounded-3 bg-white p-4" style={{width: '500px'}}>
                        <div className="small fw-bold text-truncate">{assignTodoData?.attributes?.title}</div>
                        <div className="bg-light my-2 p-2 rounded-3">{assignTodoData?.attributes?.description}</div>
                        <div className="d-sm-flex d-block align-items-center mt-3 pt-3 border-top">
                            <span className="me-5">{new Date().toDateString()}</span>
                            <Dropdown size="sm">
                                <Dropdown.Toggle className="btn btn-sm bg-white text-primary border shadow-sm me-2">Assign To <span ref={dropdownName2Ref}></span></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div className="overflow-auto" style={{maxHeight: '300px'}}>
                                        {
                                            members.length?
                                            members.map((member, key)=>(
                                                <Dropdown.Item onClick={(e)=>updateDropdown(member)} as="button" key={key}>{member.attributes.name}</Dropdown.Item>
                                            )):<div className="px-3 small text-center text-white bg-primary">No Records</div>
                                        }
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            <button onClick={showTodoCreate} className="btn btn-sm border shadow-sm">Add Task</button>
                        </div>
                        <div className="text-end mt-3 pt-3 border-top">
                            <button onClick={assignTo} className="btn btn-sm border shadow-sm px-3 me-2 text-success">Save</button>
                            <button onClick={()=>setOpenAssignTo(false)} className="btn btn-sm border shadow-sm text-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <Loading show={loading} />
        </div>
    )
}