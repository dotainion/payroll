import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { Pagination } from "../components/Pagination";
import { routes } from "../router/routes";
import { EmployeeOptions } from "../components/EmployeeOptions";
import { useNavigate } from "react-router-dom";
import { api } from "../request/Api";
import { useDocument } from "../contents/DocumentProvider";

export const Employees = () =>{
    const { setLoading } = useDocument();

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const optionRef = useRef();
    const targetRef = useRef();
    const cursorRef = useRef();
    const selectedRef = useRef();

    const timeoutRef = useRef();
    const tbodyRef = useRef();

    const onShowOptons = (e, employee) =>{
        if($(e.target).is('.d-inline-block') || $(e.target).is('input')) return;
        selectedRef.current = employee;
        cursorRef.current = e.pageX;
        targetRef.current = e.currentTarget;
        $(optionRef.current).show('fast').find('div').text(employee.name);
        setOptionPosition();

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            $(optionRef.current).hide('fast');
        }, 60000);
    }

    const setOptionPosition = () =>{
        if(!targetRef.current) return;
        const top = $(targetRef.current).offset().top + $(targetRef.current).height();
        $(optionRef.current).css({top: top, left: cursorRef.current - ($(optionRef.current).width()/2)});
    }

    const onSelect = () =>{
        const checked = $(tbodyRef.current).find('input:checked').length > 1;
        toggleBulkMuted(!checked);
    }

    const toggleBulkMuted = (checked) =>{
        if(checked){
            $(optionRef.current).find('[data-bulk]').addClass('opacity-50 bg-white');
            $(optionRef.current).find('[data-bulk]').attr('data-disabled', 'disabled');
        }else{
            $(optionRef.current).find('[data-bulk]').removeClass('opacity-50 bg-white');
            $(optionRef.current).find('[data-bulk]').removeAttr('data-disabled', 'disabled');
        }
    }

    const onToggleSelectAll = (e) =>{
        $(tbodyRef.current).find('input').each((i, child)=>{
            child.checked = e.target.checked;
        });
        toggleBulkMuted(!e.target.checked);
    }

    useEffect(()=>{
        $(window).resize(()=>setOptionPosition());
        $(window).click(()=>$(optionRef.current).hide('fast'));
        $(document).mousemove(function(e){
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                $(optionRef.current).hide('fast');
            }, 60000);
        }); 
    }, []);

    useEffect(()=>{
        setLoading(true);
        api.user.listUsers().then((response)=>{
            setUsers(response.data.data);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);
    return(
        <div>
            <EmployeeOptions 
                optionRef={optionRef} 
                onEdit={()=>navigate(routes.workspace().nested().editEmployee(selectedRef.current?.id))} 
                onDelete={()=>{console.log('hello am deleteding..')}} 
                onReport={()=>navigate(routes.workspace().nested().createReport(selectedRef.current?.id))}
                onSeeReport={()=>navigate(routes.workspace().nested().employeeReport(selectedRef.current?.id))}
                onBulkReport={()=>console.log('bulk reporting...')}
            />
            <Pagination onScroll={()=>setOptionPosition()} title="Salaries List">
                <div onClick={(e)=>e.stopPropagation()}>
                    <table className="p-3 table table-white table-striped table-bordered table-hover text-nowrap">
                        <thead className="">
                            <tr>
                                <th>
                                    <input onChange={onToggleSelectAll} className="form-check-input bg-primary" type="checkbox"/>
                                </th>
                                <th>Employee</th>
                                <th>ID</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody ref={tbodyRef}>
                            {users.map((employee, key)=>(
                                <tr onClick={(e)=>onShowOptons(e, employee)} className="pointer" key={key}>
                                    <td title="Select all">
                                        <input onChange={onSelect} className="form-check-input bg-primary" type="checkbox"/>
                                    </td>
                                    <td>{employee?.attributes?.name}</td>
                                    <td>{employee?.attributes?.userId}</td>
                                    <td>{employee?.attributes?.email}</td>
                                    <td hidden>{employee?.attributes?.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Pagination>
        </div>
    )
}