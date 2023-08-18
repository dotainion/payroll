import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from "../router/routes";
import { GoDotFill } from "react-icons/go";

export const CalendarSidebar = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        {
            title: 'Employees Report',
            active: location.pathname.includes(routes.workspace().employees()),
            onClick: ()=>navigate(routes.workspace().employees())
        },
    ];
    return(
        <div className="auth-sidebar bg-secondary">
            {menus.map((menu, key)=>(
                <button className={`btn btn-secondary text-start rounded-0 d-flex align-items-center w-100 ${menu.active ? 'border-light bg-secondary' : ''}`} key={key}>
                    <GoDotFill/>
                    <div className="w-100 ms-2">{menu.title}</div>
                </button>
            ))}
        </div>
    )
}