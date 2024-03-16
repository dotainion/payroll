import React, { useEffect, useState } from "react";
import { IoMdAlert } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";
import { MdPending } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { api } from "../request/Api";
import { useAuth } from "../auth/AuthProvider";

export const TodoComponent = () =>{
    const { user } = useAuth();
    
    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        api.todo.listOverdueByUser(user?.id).then((response)=>{
            setTodos(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="bg-white shadow rounded-3 p-3" style={{width: '400px'}}>
            <div className="border-2 border-bottom fw-bold pb-3 mb-2">Top to-dos</div>
            <div className="overflow-auto" style={{height: '350px'}}>
                {
                    todos.length ?
                    todos.map((todo, key)=>(
                        <div className="d-flex align-items-center border-bottom py-2" key={key}>
                            <div className="me-2">
                                {todo.attributes.isOverdue ? <IoMdAlert className="text-danger"/> : null}
                                {todo.attributes.isUpComming ? <FiAlertTriangle className="text-warning"/> : null}
                                {todo.attributes.isPending ? <MdPending className="text-success"/> : null}
                            </div>
                            <div>
                                {todo.attributes.isOverdue ? <div className={'small text-danger'}><small>{todo.attributes.title}</small></div> : null}
                                {todo.attributes.isUpComming ? <div className={'small text-warning'}><small>{todo.attributes.title}</small></div> : null}
                                {todo.attributes.isPending ? <div className={'small text-success'}><small>{todo.attributes.title}</small></div> : null}
                                <div className="small">{todo.attributes.description}</div>
                                <div className="small"><small>{new Date(todo.attributes.due).toDateString()}</small></div>
                            </div>
                        </div>
                    )):
                    <div className="small">No overdue</div>
                }
            </div>
            <div className="text-center pt-2">
                <button onClick={()=>navigate(routes.workspace().todoList())} className="btn link-primary">View all notification</button>
            </div>
        </div>
    )
}