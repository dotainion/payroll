import React from "react";
import logo from '../../images/logo-icon.png';
import { useAuth } from "../../auth/AuthProvider";

export const PayslipItemizeHead = ({report}) =>{
    const { business } = useAuth();
    return(
        <div>
            <input value={report?.id} name="reportId" hidden onChange={()=>{}} style={{display: 'none'}} />
            <input value={report?.attributes?.user?.id} name="userId" hidden onChange={()=>{}} style={{display: 'none'}} />
            <div className="text-end fw-bold">{business?.attributes?.name}</div>
            <div className="d-flex w-100">
                <div className="w-100">
                    <img src={logo} alt=""/>
                </div>
                <div className="w-100">
                    <div className="text-end">{business?.attributes?.state}</div>
                    <div className="text-end">{business?.attributes?.city}</div>
                </div>
            </div>
            <div className="text-center border-bottom mb-2">Payroll {report?.attributes?.date?.split?.(' ')?.[0]}</div>


            <div className="d-flex w-100">
                <div className="w-100">
                    <div className="me-3">Cagegory:</div>
                    <div className="fw-bold">ITEMIZE REPORT</div>
                </div>
            </div>

            <div className="d-flex w-100 mb-3">
                <div className="w-100">
                    <div className="me-3">Period Ended:</div>
                    <div className="fw-bold">{report?.attributes?.date?.split?.(' ')?.[0]}</div>
                </div>
                <div className="w-100">
                    <div className="me-3">Payroll Set:</div>
                    <div className="fw-bold">MONTHLY PAYROLL</div>
                </div>
            </div>
        </div>
    )
}