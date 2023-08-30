import React, { Children, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { Pagination } from "../components/Pagination";
import { routes } from "../router/routes";
import { BsArrowsCollapse, BsTicketDetailedFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { api } from "../request/Api";
import { Tooltip } from "../container/Tooltip";
import { ReportExpandableColumn } from "../components/ReportExpandableColumn";
import { FiEdit } from 'react-icons/fi';
import { EllipsisOption } from "../widgets/EllipsisOption";
import { BiSolidReport } from "react-icons/bi";

export const EmployeeReports = () =>{
    const [user, setUser] = useState();
    const [reports, setReporst] = useState([]);
    const [collapse, setCollapse] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        api.user.fetchUser(params?.userId).then((response)=>{
            setUser(response.data.data[0]);
        }).catch((error)=>{
            console.log(error);
        });
        api.report.listByUser(params?.userId).then((response)=>{
            setReporst(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return(
        <div>
            <Pagination beginChildren={<CollapseButton user={user} onClick={()=>setCollapse(!collapse)}/>} title={'Reports: ' + user?.attributes?.name}>
                <div>
                    <table className="p-3 table table-white table-striped table-bordered text-nowrap">
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Date</th>
                                <th>Salary</th>
                                <th>Net Salary</th>
                                <th>Allowance</th>
                                <th>Deduction</th>
                                <th>YTD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((rept, key)=>(
                                <tr className="table-row striped" key={key}>
                                    <td>
                                        <EllipsisOption>
                                            <Dropdown.Item 
                                                onClick={()=>navigate(routes.workspace().nested().editReport(rept?.id))} 
                                                className="d-flex align-items-center"><FiEdit className="me-2"/>Edit</Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={()=>navigate(routes.workspace().nested().employeePayslip(rept?.id))}
                                                className="d-flex align-items-center"><BiSolidReport className="me-2"/>Invoice</Dropdown.Item>
                                        </EllipsisOption>
                                    </td>
                                    <td>{new Date(rept?.attributes?.date).toDateString()}</td>
                                    <td><span className="fw-bold">$</span> {rept?.attributes?.totalSalary || 0}</td>
                                    <td><span className="fw-bold">$</span> {rept?.attributes?.netSalary || 0}</td>
                                    <td><ReportExpandableColumn items={rept?.attributes?.allAllowances} value={rept?.attributes?.totalAllowance || 0} collapse={collapse} /></td>
                                    <td><ReportExpandableColumn items={rept?.attributes?.allDeductions} value={rept?.attributes?.totalDeduction || 0} collapse={collapse} /></td>
                                    <td><span className="fw-bold">$</span> {rept?.attributes?.ytd || 0}</td>
                                    <td hidden>{rept?.attributes?.user?.attributes?.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Pagination>
        </div>
    )
}

export const CollapseButton = ({user, onClick}) =>{
    return(
        <div className="d-flex align-items-center mt-2">
            <Tooltip title={'Collapse details'}>
                <button onClick={onClick} className=" btn btn-sm btn-outline-primary py-1 px-2">Collapse</button>
            </Tooltip>
            <div className="ms-5">ID: <span className="fw-bold">{user?.attributes?.userId}</span></div>
        </div>
    )
}