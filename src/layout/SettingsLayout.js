import React, { createContext, useContext, useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { useEffect } from "react";
import $ from 'jquery';
import { useRef } from "react";
import { BsHouseAddFill } from "react-icons/bs";
import { SettingsSidebar } from "./SettingsSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { ChangeCredential } from "../components/ChangeCredential";

export const SettingsLayout = ({children}) =>{
    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);

    return(
        <div>
            <div className="d-flex align-items-center shadow-sm w-100">
                <button onClick={()=>navigate(routes.workspace().nested().employees())} className="d-flex align-items-center bg-transparent text-nowrap border-0">
                    <BsHouseAddFill className="fs-3 text-secondary me-2"/>
                    <span>Go to Workspace</span>
                </button>
                <div className="w-100">
                    <NavigationBar/>
                </div>
            </div>
            <div className="d-flex w-100">
                <SettingsSidebar/>
                <div className="w-100 pt-2 overflow-auto bg-white">
                    {children}
                </div>
            </div>
            <ChangeCredential/>
        </div>
    )
}