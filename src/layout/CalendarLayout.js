import React, { createContext, useContext, useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { useEffect } from "react";
import { BsHouseAddFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { CalendarSidebar } from "./CalendarSidebar";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GrSchedules } from 'react-icons/gr';

export const CalendarLayout = ({children}) =>{
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{

    }, []);

    return(
        <div className="">
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
                <CalendarSidebar/>
                <div className="w-100 text-nowrap">
                    <div className="d-flex align-items-center justify-content-end border-bottom w-100 px-2 pt-1">
                        <button onClick={()=>navigate(routes.calendar().month())} className={`btn btn-light shadow-none px-3 mx-1 ${location.pathname.includes(routes.calendar().month())?'border-info':'border-white'}`}>
                            <MdOutlineCalendarMonth/>
                            <span>Month</span>
                        </button>
                        <button onClick={()=>navigate(routes.calendar().week())} className={`btn btn-light shadow-none px-3 mx-1 ${location.pathname.includes(routes.calendar().week())?'border-info':'border-white'}`}>
                            <MdOutlineCalendarMonth/>
                            <span>Week</span>
                        </button>
                        <button onClick={()=>navigate(routes.calendar().day())} className={`btn btn-light shadow-none px-3 mx-1 ${location.pathname.includes(routes.calendar().day())?'border-info':'border-white'}`}>
                            <MdOutlineCalendarMonth/>
                            <span>Day</span>
                        </button>
                        <button onClick={()=>navigate(routes.calendar().schedule())} className={`btn btn-light shadow-none px-3 mx-1 ${location.pathname.includes(routes.calendar().schedule())?'border-info':'border-white'}`}>
                            <GrSchedules/>
                            <span>Schedule</span>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}