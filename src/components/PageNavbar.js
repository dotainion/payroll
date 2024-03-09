import React, { useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { GrMoney } from "react-icons/gr";
import { IoCalendarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { GeneratePayrollButton } from "./GeneratePayrollButton";

export const PageNavbar = () =>{
    const navigate = useNavigate();

    return(
        <div className="border-bottom mb-3 bg-dark text-center small">
            <GeneratePayrollButton>
                <button className="btn mx-2 small">
                    <IoCalendarSharp className="text-dark p-2 display-5 rounded-circle bg-light"/>
                    <div className="small text-light"><small><small>New payroll</small></small></div>
                </button>
            </GeneratePayrollButton>
            <button onClick={()=>navigate(routes.workspace().nested().createEmployee())} className="btn mx-2 small">
                <BsPersonFillAdd className="text-dark p-2 display-5 rounded-circle bg-light"/>
                <div className="small text-light"><small><small>New employee</small></small></div>
            </button>
            <button className="btn mx-2 small">
                <GrMoney className="text-dark p-2 display-5 rounded-circle bg-light"/>
                <div className="small text-light"><small><small>Review tax</small></small></div>
            </button>
            <button onClick={()=>navigate(routes.workspace().nested().viewReports())} className="btn mx-2 small">
                <HiDocumentReport className="text-dark p-2 display-5 rounded-circle bg-light"/>
                <div className="small text-light"><small><small>View report</small></small></div>
            </button>
        </div>
    )
}