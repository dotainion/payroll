import React, { useRef, useEffect } from "react";
import { SickLeaves } from "../settings/SickLeaves";
import { TaxSetupContainer } from "../settings/TaxSetupContainer";
import { routes } from "../router/routes";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { OvertimeContainer } from "../settings/OvertimeContainer";

export const Settings = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        {title: 'Tax Setting', route: routes.settings().tax()},
        {title: 'Sick Leave', route: routes.settings().sickLeave()},
        {title: 'Overtime', route: routes.settings().overtime()},
    ]

    return(
        <div className="w-100 h-100 bg-white">
            <ul className="nav nav-tabs">
                {tabs.map((tab, key)=>(
                    <li className="nav-item pointer" key={key}>
                        <a 
                            onClick={()=>navigate(tab.route)} 
                            className={`nav-link ${location.pathname.includes(tab.route) ? 'active' : ''}`}
                        >{tab.title}</a>
                    </li>
                ))}
            </ul>
            <div className="overflow-auto" style={{height: '88vh'}}>
                <div className="page profile text-nowrap">
                    <Routes>
                        <Route path={routes.settings().tax()} element={<TaxSetupContainer/>}/>
                        <Route path={routes.settings().sickLeave()} element={<SickLeaves/>}/>
                        <Route path={routes.settings().overtime()} element={<OvertimeContainer/>}/>
                        <Route path={'*'} element={<TaxSetupContainer/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}