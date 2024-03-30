import React, { useCallback, useEffect, useState } from "react";
import { ReportOptionsHeader } from "../components/ReportOptionsHeader";
import { toast } from "../utils/Toast";
import $ from 'jquery';
import { api } from "../request/Api";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { Loading } from "../components/Loading";
import { BiCalendar } from "../components/BiCalendar";
import { DateHelper } from "../utils/DateHelper";
import { BiSolidReport } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export const GenerateBulkReportForUsers = () =>{
    const [loading, setLoading] = useState(false);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [collection, setCollection] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showEmployees, setShowEmployee] = useState(false);
    const [hasPendingReports, setHasPendingReports] = useState(false);

    const navigate = useNavigate();

    const generateReport = useCallback(()=>{
        let userId = [];
        collection.forEach((u) => userId.push(u?.id));
        if(!userId.length) return toast.error('Bulk Report', 'Must add at lease one user.');
        if(!from || !to) return toast.error('Bulk Report', 'Period date is required.');
        setLoading(true);
        api.report.generateBulkReportByUserIdArray(userId, {from, to}).then((response)=>{
            navigate(routes.workspace().nested().approveBulkReport());
        }).catch((error)=>{
            toast.error('Bulk Report', error);
        }).finally(()=>{
            setLoading(false);
        });
    }, [collection, from, to]);

    const addInPayroll = useCallback((userId)=>{
        setLoading(true);
        api.user.addInPayroll(userId).then((response)=>{
            setCollection(response.data.data);
        }).catch((error)=>{
            toast.error('Employee In Payroll', error);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const removeFromPayroll = useCallback((userId)=>{
        setLoading(true);
        api.user.removeFromPayroll(userId).then((response)=>{
            setCollection(response.data.data);
        }).catch((error)=>{
            toast.error('Employee In Payroll', error);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);
    
    const onSelect = (e, userId) =>{
        const checkbox = $(e.currentTarget).find('input[type=checkbox]').get(0);
        if(!$(e.target).is(checkbox)){
            checkbox.checked = !checkbox.checked;
        }
        if(checkbox.checked) return addInPayroll(userId);
        removeFromPayroll(userId);
    }

    useEffect(()=>{
        setLoading(true);
        api.report.listPendingBulkReports().then((response)=>{
            setHasPendingReports(true);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });

        api.user.listUsers().then((response)=>{
            setEmployees(response.data.data);
            const collec = response.data.data.filter((c)=>c?.attributes?.inPayroll);
            setCollection(collec);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="container">
            <ReportOptionsHeader />
            <div className="d-flex w-100 mt-3 border-top border-bottom border-secondary py-3">
                <div className="w-100">
                    <button onClick={()=>navigate(routes.workspace().nested().createEmployee())} className="btn btn-dark rounded-0 me-2">Create employee</button>
                    <button onClick={()=>setShowEmployee(true)} className="btn btn-primary rounded-0 ">Add/Remove employee</button>
                </div>
                <div className="text-end w-100">
                    <button onClick={generateReport} className="btn btn-success rounded-0 ">Generate report</button>
                </div>
            </div>
            <div className="allowance-row bg-transparent mt-2 mb-5" style={{width: '400px'}}>
                <label>Period <span className="text-danger">*</span></label>
                <BiCalendar onSelect={(from, to)=>{
                    setFrom(new DateHelper(from.dateInstance).toSqlString());
                    setTo(new DateHelper(to.dateInstance).toSqlString());
                }} />
            </div>
            <div className="">
                <table className="table p-3 table-white text-nowrap">
                    <tbody>
                        {collection.map((employee, key)=>(
                            <tr key={key}>
                                <td className="border-0">{employee?.attributes?.name}</td>
                                <td className="border-0">{employee?.attributes?.userId}</td>
                                <td className="border-0">{employee?.attributes?.email}</td>
                                <td className="border-0">{employee?.attributes?.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="backdrop top-0" hidden={!showEmployees}>
                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                    <div className="bg-light">
                        <div className="d-flex fw-bold px-4 py-3 h5">
                            <div className="me-5">Employees</div>
                            <div className="text-end w-100 ms-5">
                                <button onClick={()=>setShowEmployee(false)} className="btn btn-sm btn-dark">Done</button>
                            </div>
                        </div>
                        <div className="overflow-y-auto overflow-x-hidden" style={{maxHeight: '50vh'}}>
                            <table className="table user-select-none table-hover table-white text-nowrap">
                                <tbody>
                                    {employees.map((employee, key)=>(
                                        <tr onClick={(e)=>onSelect(e, employee?.id)} className="pointer" key={key}>
                                            <td className="border-0">
                                                <input type="checkbox" defaultChecked={employee?.attributes?.inPayroll} style={{width: '20px', height: '20px'}} />
                                            </td>
                                            <td className="border-0">{employee?.attributes?.name}</td>
                                            <td className="border-0">{employee?.attributes?.userId}</td>
                                            <td className="border-0">{employee?.attributes?.email}</td>
                                            <td className="border-0">{employee?.attributes?.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {employees.length ? null : <div className="p-3 pt-0">No employees</div>}
                        </div>
                    </div>
                </div>
            </div>
            {hasPendingReports && !loading ? <div className="backdrop top-0">
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center bg-white p-4">
                        <div>
                            <div className="h4">Existing Pending Reports</div>
                            <div className="fw-bold text-muted mb-2">There is existing reports pending</div>
                            <div className="d-flex align-items-center my-2"><FaCheck className="text-success" /><span onClick={()=>navigate(routes.workspace().nested().approveBulkReport())} className="link-primary pointer ms-2">Approve pending reports</span></div>
                            <div className="d-flex align-items-center my-2"><MdDashboard className="text-primary" /><span onClick={()=>navigate(routes.workspace().nested().dashboard())} className="link-primary pointer ms-2">Go to dashboard</span></div>
                            <div className="d-flex align-items-center my-2"><BiSolidReport className="text-info" /><span onClick={()=>navigate(routes.workspace().nested().viewReports())} className="link-primary pointer ms-2">Review reports</span></div>
                        </div>
                        <div className="ms-3">
                            <BiSolidReport className="display-1" />
                        </div>
                    </div>
                </div>
            </div>: null}
            <Loading show={loading} />
        </div>
    )
}