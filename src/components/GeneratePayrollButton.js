import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { routes } from "../router/routes";


export const GeneratePayrollButton = ({children}) =>{
    const [showPayrollBtn, setShowPayrollBtn] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const cloneBulkReport = useCallback(() =>{
        setLoading(true);
        api.report.bulkClone().then((response)=>{
            setShowPayrollBtn(false);
            const reportIdArray = response.data.data.map((report)=>report.id);
            navigate(routes.workspace().nested().eachEmployeePayslip(routes.utils.stringify(reportIdArray)));
        }).catch((error)=>{
            toast.error('Generating Blulk Report', error);
        }).finally(()=>{
            setLoading(false);
        });
    });

    const closePayrollBtn = (e) =>{
        if(e.target !== e.currentTarget) return;
        setShowPayrollBtn(false);
    }

    return(
        <>
        <span onClick={()=>setShowPayrollBtn(true)}>{children}</span>
        <div className="backdrop top-0" hidden={!showPayrollBtn}>
            <div onClick={closePayrollBtn} className="d-flex align-items-center justify-content-center w-100 h-100">
                <div className="bg-white text-start shadow rounded-3 p-4">
                    <div className="h4 fw-bold">Generate payroll</div>
                    <div>Payroll will be generated from last payroll for reach employee</div>
                    <button onClick={cloneBulkReport} className="btn btn-sm btn-dark px-3 mt-3 me-2">Generate payroll</button>
                    <button onClick={()=>setShowPayrollBtn(false)} className="btn btn-sm btn-dark px-3 mt-3">Cancel</button>
                </div>
                <Loading show={loading} />
            </div>
        </div>
        </>
    )
}