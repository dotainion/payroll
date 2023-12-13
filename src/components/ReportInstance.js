import React, { useEffect, useRef, useState } from "react";
import { Report } from "../components/Report";
import { ExistingAddOn } from "../addons/Addons";
import { LoanAddOnExisting } from "../addons/LoanAddOn";
import { CostTypeAndRateHandler } from "../utils/CostTypeAndRateHandler";
import { NoPayLeaveAddOnExisting } from "../addons/NoPayLeaveAddOn";
import { ExistingSickLeaveAddOn } from "../addons/SickLeaveAddOn";
import { ExistingOvertimeAddOn } from "../addons/OvertimeAddOn";

const typeHandler = new CostTypeAndRateHandler();
export const ReportInstance = ({title, report,  onUser, children}) =>{
    const [sickLeaves, setSickLeaves] = useState();
    const [period, setPeriod] = useState();
    const [taxDeductions, setTaxDeductions] = useState([]);
    const [existingAllowances, setExistingAllowances] = useState([]);
    const [existingDeductions, setExistingDeductions] = useState([]);

    useEffect(()=>{
        if(!report) return;
        setPeriod({from: report?.attributes?.periodFrom, to: report?.attributes?.periodTo});
        let existAllows = [];
        let existSickLeaves = [];
        report?.attributes?.allAllowances?.forEach((item)=>{
            if(item.type === 'allowance'){
                item.attributes.type = typeHandler.costValueToDisplay(item.attributes.type);
                item.attributes.rate = typeHandler.costValueToDisplay(item.attributes.rate);
                existAllows.push({component: ExistingAddOn, data: item});
            }else if (item.type === 'loanAllowance'){
                existAllows.push({component: LoanAddOnExisting, data: item});
            }else if (item.type === 'noPayLeaveAllowance'){
                existAllows.push({component: NoPayLeaveAddOnExisting, data: item});
            }else if (item.type === 'overtime'){
                existAllows.push({component: ExistingOvertimeAddOn, data: item});
            }else if (item.type === 'sickLeave'){
                existSickLeaves.push({component: ExistingSickLeaveAddOn, data: item});
            }
        });
        setExistingAllowances(existAllows);

        let existDeducts = [];
        report?.attributes?.allDeductions?.forEach((item)=>{
            if(item.type === 'deduction'){
                item.attributes.type = typeHandler.costValueToDisplay(item.attributes.type);
                item.attributes.rate = typeHandler.costValueToDisplay(item.attributes.rate);
                existDeducts.push({component: ExistingAddOn, data: item});
            }else if (item.type === 'loanDeduction'){
                existDeducts.push({component: LoanAddOnExisting, data: item});
            }else if (item.type === 'noPayLeaveDeduction'){
                existDeducts.push({component: NoPayLeaveAddOnExisting, data: item});
            }else if (item.type === 'overtime'){
                existDeducts.push({component: ExistingOvertimeAddOn, data: item});
            }else if (item.type === 'sickLeave'){
                existSickLeaves.push({component: ExistingSickLeaveAddOn, data: item});
            }else if (item.type === 'tax'){
                setTaxDeductions((taxs)=>[...taxs, item]);
            }
        });
        setSickLeaves(existSickLeaves);
        setExistingDeductions(existDeducts);
    }, [report]);

    return(
        <Report 
            period={period}
            title={title} 
            reportId={report?.id} 
            userId={report?.attributes?.userId} 
            propUser={report?.attributes?.user} 
            netSalary={report?.attributes?.netSalary}
            onUser={onUser} 
            sickLeaves={sickLeaves}
            existingAllowances={existingAllowances} 
            existingDeductions={existingDeductions}
            existingTaxDeductions={taxDeductions}
        >
            {children}
        </Report>
    )
}

