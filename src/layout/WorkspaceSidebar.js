import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPeopleGroup, FaPerson } from 'react-icons/fa6';
import logo from '../images/logo.png';
import { MenuOption } from "../widgets/MenuOption";
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from "../router/routes";
import { FaClone } from "react-icons/fa";
import { useDocument } from "../contents/DocumentProvider";

export const WorkspaceSidebar = () =>{
    const { previousHistory, addPreviousHistory } = useDocument();

    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        {
            title: 'GPC Payroll',
            list: [
                {
                    icon: FaPerson,
                    title: 'Create Employee',
                    active: location.pathname.includes(routes.workspace().createEmployee()),
                    onClick: ()=>navigate(routes.workspace().createEmployee())
                },{
                    icon: FaPeopleGroup,
                    title: 'Employees List',
                    active: location.pathname.includes(routes.workspace().employees()),
                    onClick: ()=>navigate(routes.workspace().employees())
                },{
                    icon: FaClone,
                    title: 'Generate Bulk Report',
                    active: location.pathname.includes(routes.workspace().bulkReport()),
                    onClick: ()=>navigate(routes.workspace().bulkReport())
                }
            ]
        }
    ];

    return(
        <div className="auth-sidebar bg-dark">
            <div className="d-flex align-items-center py-2 bg-white">
                <div className="sidebar-logo">
                    <img className="" src={logo} alt="" />
                </div>
                <div>
                    <AiOutlineMenu className="fs-4 pointer"/>
                </div>
            </div>
            {menus.map((menu, key)=>(
                <MenuOption menu={menu} key={key}/>
            ))}
            {
                previousHistory.length &&
                <div className="text-secondary p-3">
                    <div className="fw-bold">History</div>
                    {previousHistory.map((histy, key)=>(
                        <div onClick={()=>histy?.action?.()} className="d-flex align-items-center px-3 my-2 w-100 pointer link-secondary" key={key}>
                            <div className="w-100 text-truncate">{histy?.title}</div>
                            <div className="small text-nowrap"><small><small>{histy?.time}</small></small></div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}