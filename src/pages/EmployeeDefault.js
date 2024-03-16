import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { FcSettings } from "react-icons/fc";
import { RiAddFill } from 'react-icons/ri';
import { MdOutlineFormatListNumbered } from 'react-icons/md';
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { UpcomingPayroll } from "../components/UpcomingPayroll";
import { PieRoundChart } from "../components/PieRoundChart";
import { TodoComponent } from "../components/TodoComponent";
import { IoMdAlert } from "react-icons/io";
import { PageNavbar } from "../components/PageNavbar";

export const EmployeeDefault = () =>{

    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);
    return(
        <div className="page bg-lightgray w-100" style={{minWidth: '870px'}}>
            <PageNavbar/>
            <div className="container">
                <div className="d-block d-md-flex w-100 justify-content-center">
                    <UpcomingPayroll/>
                    <div className="bg-white shadow rounded-3 p-3 ms-2 w-100">
                        <div onClick={()=>navigate(routes.workspace().createEmployee())} className="d-flex align-items-center bg-lightgray pointer p-2 shadow-sm rounded-3">
                            <div className="w-100">
                                <div className="small fw-bold">Create Employees</div>
                                <div className="small">In publ raphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.</div>
                            </div>
                            <div>
                                <RiAddFill className="text-secondary"/>
                            </div>
                        </div>
                        <div onClick={()=>navigate(routes.workspace().employees())} className="d-flex align-items-center bg-lightgray pointer p-2 mt-3 shadow-sm rounded-3">
                            <div className="w-100">
                                <div className="small fw-bold">View Employees</div>
                                <div className="small">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.</div>
                            </div>
                            <div>
                                <MdOutlineFormatListNumbered className="text-secondary"/>
                            </div>
                        </div>
                        <div className="d-flex align-items-center bg-lightgray pointer p-2 mt-3 shadow-sm rounded-3">
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
                <div className="d-block d-md-flex w-100 justify-content-center my-2">
                    <div className="d-block d-md-flex align-items-center w-100 bg-white shadow rounded-3 p-3">
                        <div className="w-100">
                            <PieRoundChart/>
                        </div>
                        <div className="h-100 border mx-3"></div>
                        <div className="ms-3 w-100 h-100" style={{minWidth: '200px'}}>
                            <div className="border-2 border-bottom fw-bold pb-3 mb-3">Services</div>
                            <div className="d-flex align-items-center my-3">
                                <div className="me-2">
                                    <IoMdAlert className="text-dark p-2 display-5 rounded-circle bg-secondary"/>
                                </div>
                                <div className="small">
                                    <div className="fw-bold">Payroll</div>
                                    <div>Generate and print reports</div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center my-3">
                                <div className="me-2">
                                    <IoMdAlert className="text-dark p-2 display-5 rounded-circle bg-secondary"/>
                                </div>
                                <div className="small">
                                    <div className="fw-bold">HR</div>
                                    <div>Handbooks and hiring</div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center my-3">
                                <div className="me-2">
                                    <IoMdAlert className="text-dark p-2 display-5 rounded-circle bg-secondary"/>
                                </div>
                                <div className="small">
                                    <div className="fw-bold">Time Tracking</div>
                                    <div>Track your team's time</div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center my-3">
                                <div className="me-2">
                                    <IoMdAlert className="text-dark p-2 display-5 rounded-circle bg-secondary"/>
                                </div>
                                <div className="small">
                                    <div className="fw-bold">Schedule</div>
                                    <div>Manage schedules</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-1"></div>
                    <TodoComponent/>
                </div>
            </div>
        </div>
    )
}