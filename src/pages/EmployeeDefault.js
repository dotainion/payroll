import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { FcSettings } from "react-icons/fc";
import { RiAddFill } from 'react-icons/ri';
import { MdOutlineFormatListNumbered } from 'react-icons/md';
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";

export const EmployeeDefault = () =>{
    const [list, setList] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);
    return(
        <div className="page text-nowrap bg-lightgray">
            <div className="border-bottom fs-5 p-3 fw-bold my-3 bg-white">Employees workspace</div>
            <div className="shadow-sm p-3 mt-4 bg-white">
                <div onClick={()=>navigate(routes.workspace().createEmployee())} className="d-flex align-items-center bg-lightgray pointer p-2">
                    <div className="w-100">
                        <div className="small fw-bold">Create Employees</div>
                        <div className="small">In publ raphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.</div>
                    </div>
                    <div>
                        <RiAddFill className="text-secondary"/>
                    </div>
                </div>
                <div onClick={()=>navigate(routes.workspace().employees())} className="d-flex align-items-center bg-lightgray pointer p-2 mt-3">
                    <div className="w-100">
                        <div className="small fw-bold">View Employees</div>
                        <div className="small">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.</div>
                    </div>
                    <div>
                        <MdOutlineFormatListNumbered className="text-secondary"/>
                    </div>
                </div>
                <div className="d-flex align-items-center bg-lightgray pointer p-2 mt-3">
                    <div className="w-100">
                        <div className="small fw-bold">Employee Settings</div>
                        <div className="small">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.</div>
                    </div>
                    <div>
                        <FcSettings/>
                    </div>
                </div>
            </div>
        </div>
    )
}