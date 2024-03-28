import React, { useEffect, useState } from "react";
import { AllowanceGenerator } from "../widgets/AllowanceGenerator";
import { DeductionGenerator } from "../widgets/DeductionGenerator";
import { FaDollarSign } from "react-icons/fa";
import { api } from "../request/Api";
import { SickLeaveGenerator } from "../widgets/SickLeaveGenerator";
import { BiCalendar } from "./BiCalendar";
import { TaxDeductionReadOnly } from "../widgets/TaxDeductionReadOnly";
import { TaxAlertContainer } from "./TaxAlertContainer";
import { ReportProrate } from "../widgets/ReportProrate";

export const Report = ({period, title, userId, reportId, onUser, propUser, netSalary, existingTaxDeductions, existingAllowances, existingDeductions, sickLeaves, existingProrate, children}) =>{    
    const [user, setUser] = useState();
    const [banks, setBanks] = useState([]);
    const [otSettings, setOtSettings] = useState([]);
    const [loanAllowances, setLoanAllowances] = useState([]);
    const [loanDeductions, setLoanDeductions] = useState([]);
    const [biMonthlySalary, setBiMonthlySalary] = useState();

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

        api.overtime.listOTSettingsAndPassUserId(userId).then((response)=>{
            console.log(response.data.data);
            setOtSettings(response.data.data);
        }).catch((error)=>{

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
                <TaxAlertContainer onSalaryChange={setBiMonthlySalary} existingTaxDeductions={existingTaxDeductions} />
                <div className="p-3">
                    <div className="bg-light p-2">
                        <div className="fw-bold">{user?.attributes?.name}</div>
                        <div className="small">ID: <span>{user?.attributes?.userId}</span></div>
                    </div>
                    <div className="allowance-row bg-transparent text-nowrap py-3">
                        <label>Base Salary <span className="text-danger">*</span></label>
                        <div className="input-group">
                            <span className="input-group-text"><FaDollarSign/></span>
                            <div className="form-control shadow-none small">{user?.attributes?.salary}</div>
                            <div className="form-control shadow-none small bi-month">Bi Monthly</div>
                            <div className="form-control shadow-none small border-start-0 px-0 bi-divider user-select-none">|</div>
                            <div className="form-control shadow-none small border-start-0 text-truncate">{biMonthlySalary || netSalary}</div>
                        </div>
                    </div>
                    <div className="allowance-row bg-transparent py-3" style={{width: '400px'}}>
                        <label>Period <span className="text-danger">*</span></label>
                        <BiCalendar period={period} />
                    </div>
                    <ReportProrate existingProrate={existingProrate} />
                </div>
                <div className="px-3 bg-lightergray py-3">
                    <div className="fw-bold">Allowances</div>
                    <div className="text-muted mb-2">These are perks and privilege added to an employee's salary</div>
                    <AllowanceGenerator loanAllowances={loanAllowances} banks={banks} otSettings={otSettings} existingAllowances={existingAllowances} user={propUser || user} />
                </div>
                <div className="px-3 mt-2 bg-lightergray py-3">
                    <div className="fw-bold">Deductions</div>
                    <div className="text-muted mb-2">These are loans and accounts to which an employee's salary is divided including taxes and internal loans</div>
                    <DeductionGenerator loanDeductions={loanDeductions} banks={banks} otSettings={otSettings} existingDeductions={existingDeductions} />
                </div>
                <div className="px-3 mt-2 bg-lightergray py-3">
                    <div className="fw-bold">Sick Leave</div>
                    <div className="text-muted mb-2">Leave of absence granted because of illness. This is calculated based on country's laws.</div>
                    <SickLeaveGenerator user={propUser || user} existingSickLeaves={sickLeaves}/>
                </div>
                <TaxDeductionReadOnly TaxDeductions={existingTaxDeductions} />
                <div className="p-3 text-center">
                    {children}
                </div>
                <input onChange={()=>{}} hidden value={user?.id || ''} name="userId"/>
                <input onChange={()=>{}} hidden value={reportId || ''} name="reportId"/>
            </div>
        </div>
    )
}