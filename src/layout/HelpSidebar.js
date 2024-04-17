import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from "../router/routes";
import { BiSolidReport } from "react-icons/bi";

export const HelpSidebar = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        {
            title: 'Generating Report',
            icon: BiSolidReport,
            active: location.pathname.includes(routes.help().generatingReport()),
            onClick: ()=>navigate(routes.help().generatingReport())
        },
    ];
    return(
        <div className="auth-sidebar bg-secondary p-1">
            {menus.map((menu, key)=>(
                <button onClick={menu.onClick} className={`btn btn-secondary text-start rounded-0 d-flex align-items-center w-100 ${menu.active ? 'border-light bg-secondary' : ''}`} key={key}>
                    <menu.icon/>
                    <div className="w-100 ms-2">{menu.title}</div>
                </button>
            ))}
        </div>
    )
}