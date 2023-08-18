import React, { useEffect, useRef, useState } from "react";
import { Report } from "../components/Report";
import { ExistingAddOn } from "../addons/Addons";
import { LoanAddOnExisting } from "../addons/LoanAddOn";
import { CostTypeAndRateHandler } from "../utils/CostTypeAndRateHandler";
import { NoPayLeaveAddOnExisting } from "../addons/NoPayLeaveAddOn";

const typeHandler = new CostTypeAndRateHandler();
export const ReportInstance = ({title, report,  onUser, onAllowanceRemove, onDeductionRemove, children}) =>{
    const [existingAllowances, setExistingAllowances] = useState([]);
    const [existingDeductions, setExistingDeductions] = useState([]);

    useEffect(()=>{
        if(!report) return;
        let existAllows = [];
        report?.attributes?.allAllowances?.forEach((item)=>{
            item.attributes.type = typeHandler.costValueToDisplay(item.attributes.type);
            item.attributes.rate = typeHandler.costValueToDisplay(item.attributes.rate);
            if(item.type === 'allowance'){
                existAllows.push({component: ExistingAddOn, data: item});
            }else if (item.type === 'loanAllowance'){
                existAllows.push({component: LoanAddOnExisting, data: item});
            }else if (item.type === 'noPayLeaveAllowance'){
                existAllows.push({component: NoPayLeaveAddOnExisting, data: item});
            }
        });
        setExistingAllowances(existAllows);

        let existDeducts = [];
        report?.attributes?.allDeductions?.forEach((item)=>{
            item.attributes.type = typeHandler.costValueToDisplay(item.attributes.type);
            item.attributes.rate = typeHandler.costValueToDisplay(item.attributes.rate);
            if(item.type === 'deduction'){
                existDeducts.push({component: ExistingAddOn, data: item});
            }else if (item.type === 'loanDeduction'){
                existDeducts.push({component: LoanAddOnExisting, data: item});
            }else if (item.type === 'noPayLeaveDeduction'){
                existDeducts.push({component: NoPayLeaveAddOnExisting, data: item});
            }
        });
        setExistingDeductions(existDeducts);
    }, [report]);

    return(
        <Report 
            title={title} 
            userId={report?.attributes?.userId} 
            propUser={report?.attributes?.user} 
            onUser={onUser} 
            existingAllowances={existingAllowances} 
            existingDeductions={existingDeductions}
            onAllowanceRemove={onAllowanceRemove}
            onDeductionRemove={onDeductionRemove}
        >
            {children}
        </Report>
    )
}

