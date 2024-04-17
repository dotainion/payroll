import React from "react";
import { NavigationBar } from "./NavigationBar";
import { useEffect } from "react";
import { BsHouseAddFill } from "react-icons/bs";
import { SettingsSidebar } from "./SettingsSidebar";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { HelpSidebar } from "./HelpSidebar";

export const HelpLayout = ({children}) =>{
    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);

    return(
        <div>
            <div className="d-flex align-items-center shadow-sm w-100">
                <button onClick={()=>navigate(routes.workspace().nested().dashboard())} className="d-flex align-items-center bg-transparent text-nowrap border-0">
                    <BsHouseAddFill className="fs-3 text-secondary me-2"/>
                    <span>Go to Workspace</span>
                </button>
                <div className="w-100">
                    <NavigationBar/>
                </div>
            </div>
            <div className="d-flex w-100">
                <HelpSidebar/>
                <div className="w-100 pt-2 overflow-auto bg-white" style={{height: '93vh'}}>
                    {children}
                </div>
            </div>
        </div>
    )
}