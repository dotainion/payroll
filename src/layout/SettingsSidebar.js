import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from "../router/routes";
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidBank } from 'react-icons/bi';
import { MdOutlineSecurity, MdNotifications, MdMoneyOff, MdOutlineAttachMoney } from 'react-icons/md';
import { IoIosSettings } from "react-icons/io";
import { HiBuildingOffice2 } from 'react-icons/hi2'

export const SettingsSidebar = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        {
            title: 'Business Profile',
            icon: BsFillPersonFill,
            active: location.pathname.includes(routes.settings().profile()),
            onClick: ()=>navigate(routes.settings().profile())
        },{
            title: 'Security',
            icon: MdOutlineSecurity,
            active: location.pathname.includes(routes.settings().security()),
            onClick: ()=>navigate(routes.settings().security())
        },{
            title: 'Notifications',
            icon: MdNotifications,
            active: location.pathname.includes(routes.settings().notifications()),
            onClick: ()=>navigate(routes.settings().notifications())
        },{
            title: 'Deductions',
            icon: MdMoneyOff,
            active: location.pathname.includes(routes.settings().deductions()),
            onClick: ()=>navigate(routes.settings().deductions())
        },{
            title: 'Allowances',
            icon: MdOutlineAttachMoney,
            active: location.pathname.includes(routes.settings().allowances()),
            onClick: ()=>navigate(routes.settings().allowances())
        },{
            title: 'Departments',
            icon: HiBuildingOffice2,
            active: location.pathname.includes(routes.settings().departments()),
            onClick: ()=>navigate(routes.settings().departments())
        },{
            title: 'Accounts',
            icon: BiSolidBank,
            active: location.pathname.includes(routes.settings().banks()),
            onClick: ()=>navigate(routes.settings().banks())
        },{
            title: 'Settings',
            icon: IoIosSettings,
            active: location.pathname.includes(routes.settings().settings()),
            onClick: ()=>navigate(routes.settings().settings())
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