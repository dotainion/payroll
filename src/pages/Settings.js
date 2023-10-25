import React, { useRef, useEffect } from "react";
import { SickLeaves } from "../settings/SickLeaves";
import { TaxSetupContainer } from "../settings/TaxSetupContainer";
import { routes } from "../router/routes";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

export const Settings = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        {title: 'Tax Setting', route: routes.settings().tax()},
        {title: 'Sick Leave', route: routes.settings().sickLeave()},
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
                    </Routes>
                </div>
            </div>
        </div>
    )
}