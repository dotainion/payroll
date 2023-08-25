import React, { useEffect, useState } from "react";
import { Payslip } from "./Payslip";
import { PayslipItemize } from "./PayslipItemize";
import { useWorkspace } from "../../layout/WorkspaceLayout";

export const PayslipSwitcher = ({reports, children}) =>{
    const { payslipPages, setPayslipSelectOptions } = useWorkspace();

    const [swapToItemize, setSwapToItemize] = useState();

    useEffect(()=>{
        let options = {};
        reports?.forEach((report)=>{
            report?.attributes?.allAllowances?.forEach((item)=>{
                options[item?.type] = item?.type;
            });
            report?.attributes?.allDeductions?.forEach((item)=>{
                options[item?.type] = item?.type;
            });
        });
        setPayslipSelectOptions(Object.keys(options || {}));
    }, [reports]);

    useEffect(()=>{
        if(!payslipPages || payslipPages === 'payslip') setSwapToItemize(false);
        else setSwapToItemize(true);
    }, [payslipPages]);

    return(
        <div>
            {
                swapToItemize
                    ? <PayslipItemize reports={reports} />
                    : children
            }
        </div>
    )
}