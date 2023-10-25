import React, { useEffect, useRef, useState } from "react";
import { AllowanceGenerator } from "../widgets/AllowanceGenerator";
import { DeductionGenerator } from "../widgets/DeductionGenerator";
import $ from "jquery";
import { FaDollarSign } from "react-icons/fa";
import { api } from "../request/Api";
import { MdSick } from "react-icons/md";
import { SickLeaveGenerator } from "../widgets/SickLeaveGenerator";
import { DateHelper } from "../utils/DateHelper";
import { TaxAlert } from "./TaxAlert";
import { BiCalendar } from "./BiCalendar";
import { TaxDeductionReadOnly } from "../widgets/TaxDeductionReadOnly";

export const Report = ({period, title, userId, reportId, onUser, propUser, existingTaxDeduction, existingAllowances, existingDeductions, sickLeaves, children}) =>{
    const [user, setUser] = useState();
    const [banks, setBanks] = useState([]);
    const [loanAllowances, setLoanAllowances] = useState([]);
    const [loanDeductions, setLoanDeductions] = useState([]);

    useEffect(()=>{
        if(!user) return;
        onUser?.(user);
    }, [user]);

    useEffect(()=>{
        if(!propUser) return;
        setUser?.(propUser);
    }, [propUser]);

    useEffect(()=>{
        if(!userId) return;
        api.loan.listAllowanceByUser(userId).then((response)=>{
            setLoanAllowances(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });

        api.loan.listDeductionByUser(userId).then((response)=>{
            setLoanDeductions(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });

        api.bank.listByUser(userId).then((response)=>{
            setBanks(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });

        if(propUser) return;
        api.user.fetchUser(userId).then((response)=>{
            console.log(response.data.data[0]);
            setUser(response.data.data[0]);
        }).catch((error)=>{
            console.log(error);
        });
    }, [userId]);

    return(
        <div className="" data-report-instance="">
            <div className="px-3 pb-3 m-4 bg-white">
                {title && <div className="d-flex align-items-center p-2 border-bottom">
                    <div className="fw-bold fs-5 my-3 w-100">{title}</div>
                </div>}
                <TaxAlert/>
                <div className="p-3">
                    <div className="bg-light p-2">
                        <div className="fw-bold">{user?.attributes?.name}</div>
                        <div className="small">ID: <span>{user?.attributes?.userId}</span></div>
                    </div>
                    <div className="allowance-row bg-transparent py-3">
                        <label>Base Salary <span className="text-danger">*</span></label>
                        <div className="input-group">
                            <span className="input-group-text"><FaDollarSign/></span>
                            <div className="form-control shadow-none">{user?.attributes?.salary}</div>
                        </div>
                    </div>
                    <div className="allowance-row bg-transparent py-3" style={{width: '400px'}}>
                        <label>Period <span className="text-danger">*</span></label>
                        <BiCalendar period={period} />
                    </div>
                </div>
                <div className="px-3 bg-lightergray py-3">
                    <div className="fw-bold">Allowances</div>
                    <div className="text-muted mb-2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate</div>
                    <AllowanceGenerator loanAllowances={loanAllowances} banks={banks} existingAllowances={existingAllowances} user={propUser || user} />
                </div>
                <div className="px-3 mt-2 bg-lightergray py-3">
                    <div className="fw-bold">Deductions</div>
                    <div className="text-muted mb-2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate</div>
                    <DeductionGenerator loanDeductions={loanDeductions} banks={banks} existingDeductions={existingDeductions} />
                </div>
                <div className="px-3 mt-2 bg-lightergray py-3">
                    <div className="fw-bold">Sick Leave</div>
                    <div className="text-muted mb-2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate</div>
                    <SickLeaveGenerator user={propUser || user} data={sickLeaves}/>
                </div>
                <TaxDeductionReadOnly data={existingTaxDeduction} />
                <div className="p-3 text-center">
                    {children}
                </div>
                <input onChange={()=>{}} hidden value={user?.id || ''} name="userId"/>
                <input onChange={()=>{}} hidden value={reportId || ''} name="reportId"/>
            </div>
        </div>
    )
}