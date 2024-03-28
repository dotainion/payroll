import React, { memo, useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { BiCalendar } from "../components/BiCalendar";
import { Dropdown } from "react-bootstrap";
import { EllipsisOption } from "../widgets/EllipsisOption";
import { FiEdit } from "react-icons/fi";
import { BiSolidReport } from "react-icons/bi";
import { ReportExpandableColumn } from "../components/ReportExpandableColumn";
import { PageNavbar } from "../components/PageNavbar";
import { api } from "../request/Api";
import { useDocument } from "../contents/DocumentProvider";
import { BsArrowsExpand } from "react-icons/bs";
import { BsArrowsCollapse } from "react-icons/bs";
import { DateHelper } from "../utils/DateHelper";
import { Checkbox } from "../widgets/Checkbox";


const prev = new Date();
prev.setDate(prev.getDate() - 30);
const period = {
    from: new DateHelper(prev).toSqlString(), 
    to: new DateHelper(new Date()).toSqlString()
}

export const ViewReports = () =>{
    const { setLoading } = useDocument();

    const [reports, setReporst] = useState([]);
    const [users, setUsers] = useState([]);
    const [collapse, setCollapse] = useState(false);

    const navigate = useNavigate();

    const startRef = useRef();
    const endRef = useRef();
    const userRef = useRef();

    const searchByUser = () =>{
        const userId = userRef.current.value;
        const from = startRef.current;
        const to = endRef.current;
        if(!from || !to) return;
        if(!userId){
            api.report.searchByDate(from, to).then((response)=>{
                setReporst(response.data.data);
            }).catch((error)=>{
                console.log(error);
                setReporst([]);
            }).finally(()=>{
                setLoading(false);
            });
            return;
        }
        api.report.searchByDateAndUserId(from, to, userId).then((response)=>{
            setReporst(response.data.data);
        }).catch((error)=>{
            console.log(error);
            setReporst([]);
        }).finally(()=>{
            setLoading(false);
        });
    };

    const onDateSelect = useCallback((start, end) =>{
        startRef.current = new DateHelper(start.dateInstance).toSqlString();
        endRef.current = new DateHelper(end.dateInstance).toSqlString();
        searchByUser();
    });

    useEffect(()=>{
        api.user.listUsers().then((response)=>{
            setUsers(response.data.data);
        }).catch((error)=>{

        });
    }, []);
    return(
        <div className="page bg-lightgray w-100">
            <PageNavbar/>
            <div onChange={searchByUser} className="container mb-3">
                <div className="allowance-row bg-transparent pt-3 pb-0 text-nowrap me-2 position-relative" style={{width: '150px'}}>
                    <div className="position-absolute end-0 top-50 translate-middle-y">
                        <Checkbox onChange={(r)=>setCollapse(!r.checked)} onTitle={'Collaps All'} offTitle={'Expand All'} />
                    </div>
                </div>
                <div className="allowance-row bg-transparent py-3" style={{width: '400px'}}>
                    <label>Period <span className="text-danger">*</span></label>
                    <BiCalendar period={period} onSelect={onDateSelect} biMonthlyOff fireOnLoad />
                </div>
                <div className="allowance-row bg-transparent py-3">
                    <label>Employees</label>
                    <select ref={userRef} className="form-control shadow-none pointer form-select">
                        <option value="">All</option>
                        {users.map((user, key)=>(
                            <option value={user.id} key={key}>{user.attributes.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="">
                <table className="p-3 table table-white table-striped table-bordered text-nowrap">
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Net Salary</th>
                            <th>Allowance</th>
                            <th>Deduction</th>
                            <th>Tax Withheld</th>
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
                                <td>{rept?.attributes?.user?.attributes?.name}</td>
                                <td><span className="fw-bold">$</span> {parseFloat(rept?.attributes?.totalSalary || 0).toFixed(2)}</td>
                                <td><span className="fw-bold">$</span> {parseFloat(rept?.attributes?.netSalary || 0).toFixed(2)}</td>
                                <td><ReportExpandableColumn items={rept?.attributes?.allAllowances} value={parseFloat(rept?.attributes?.totalAllowance || 0).toFixed(2)} collapse={collapse} /></td>
                                <td><ReportExpandableColumn items={rept?.attributes?.allDeductions} value={parseFloat(rept?.attributes?.totalDeduction || 0).toFixed(2)} collapse={collapse} /></td>
                                <td><TaxWithheld deductions={rept?.attributes?.allDeductions} collapse={collapse} /></td>
                                <td><span className="fw-bold">$</span> {parseFloat(rept?.attributes?.ytd || 0).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


const TaxWithheld = memo(({deductions, collapse}) =>{
    const [taxes, setTaxes] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        if(!deductions?.length) return;
        let value = 0;
        const taxDeductions = deductions?.filter?.((tax)=>{
            if(tax.type === 'tax'){
               value += parseFloat(tax?.attributes?.net);
               return true;
            }
            return false;
        });
        setTotal(value);
        setTaxes(taxDeductions);
    }, []);
    return(
        <ReportExpandableColumn items={taxes} value={parseFloat(total).toFixed(2)} collapse={collapse} />
    )
});