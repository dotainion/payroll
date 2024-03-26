import React, { memo, useEffect, useState } from "react";
import { ReportExpandableColumn } from "../components/ReportExpandableColumn";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { ReportOptionsHeader } from "../components/ReportOptionsHeader";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { Loading } from "../components/Loading";
import { BiSolidReport } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

export const ApproveBulkReport = () =>{
    const [loading, setLoading] = useState(false);
    const [reports, setReports] = useState([]);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const approveReport = () =>{
        setLoading(true);
        const reportIdArray = reports.map((r)=>r.id);
        api.report.approveReport(reportIdArray).then((response)=>{
            let total = 0;
            let totalTax = 0;
            let totalAllowance = 0;
            let totalDeduction = 0;
            response.data.data.forEach((r)=>{
                total += parseFloat(r.attributes.net);
                totalAllowance += parseFloat(r.attributes.totalAllowance);
                totalDeduction += parseFloat(r.attributes.totalDeduction);
                r.attributes.allDeductions.forEach((rr)=>{
                    if(rr.type === 'tax') totalTax += parseFloat(rr?.attributes?.net);
                });
            });
            navigate(routes.workspace().nested().reportApprovalConformation(), {
                state: {
                    people: response.data.data.length,
                    allowance: totalAllowance.toFixed(2),
                    deduction: totalDeduction.toFixed(2),
                    total: total.toFixed(2),
                    tax: totalTax.toFixed(2)
                }
            });
        }).catch((error)=>{
            toast.error('Generate report', error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(()=>{
        setLoading(true);
        api.report.listPendingBulkReports().then((response)=>{
            let subTotal = 0;
            response.data.data.forEach((r)=>subTotal += parseFloat(r.attributes.net));
            setTotal(subTotal);
            setReports(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <div className="container">
            <ReportOptionsHeader />
            <div className="border-top border-bottom border-secondary text-end mb-4 py-3">
                <div className="small">Total:</div>
                <div className="fw-bold mb-2">${total.toFixed(2)}</div>
                <button onClick={approveReport} className="btn btn-success rounded-0">Approve report</button>
            </div>
            <table className="p-3 table table-light text-nowrap">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Net Salary</th>
                        <th>Allowance</th>
                        <th>Deduction</th>
                        <th>Tax Withheld</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((rept, key)=>(
                        <tr className="table-row striped" key={key}>
                            <td>{new Date(rept?.attributes?.date).toDateString()}</td>
                            <td>{rept?.attributes?.user?.attributes?.name}</td>
                            <td><span className="fw-bold">$</span> {rept?.attributes?.totalSalary || 0}</td>
                            <td><span className="fw-bold">$</span> {rept?.attributes?.netSalary || 0}</td>
                            <td><ReportExpandableColumn items={rept?.attributes?.allAllowances} value={rept?.attributes?.totalAllowance || 0} collapse={true} /></td>
                            <td><ReportExpandableColumn items={rept?.attributes?.allDeductions} value={rept?.attributes?.totalDeduction || 0} collapse={true} /></td>
                            <td><TaxWithheld deductions={rept?.attributes?.allDeductions} collapse={true} /></td>
                            <td onClick={()=>navigate(routes.workspace().nested().editPendingReport(rept?.id))}>
                                <button className="btn btn-sm btn-dark py-0">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!reports.length && !loading ?<div className="backdrop top-0">
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center bg-white p-4">
                        <div>
                            <div className="h4">Pending Reports</div>
                            <div className="fw-bold text-muted mb-2">There is no pending report</div>
                            <div className="d-flex align-items-center my-2"><MdDashboard className="text-primary me-2" /><span onClick={()=>navigate(routes.workspace().nested().dashboard())} className="link-primary pointer">Go to dashboard</span></div>
                            <div className="d-flex align-items-center my-2"><BiSolidReport className="text-info me-2" /><span onClick={()=>navigate(routes.workspace().nested().viewReports())} className="link-primary pointer">Review reports</span></div>
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
        <ReportExpandableColumn items={taxes} value={total} collapse={collapse} />
    )
});
