import React, { useEffect, useRef, useState } from "react";
import { Payslip } from "./Payslip";
import $ from 'jquery';
import { api } from "../../request/Api";
import { useAuth } from "../../auth/AuthProvider";

export const PayslipBuilder = ({reports}) =>{
    const onShow = (e) =>{
        $(e.currentTarget).parent().find('[data-payslip]').toggle('fast');
        console.log($(e.target).parent().find('[data-payslip]'));
    }

    useEffect(()=>{
        
    }, []);

    return(
        <div className="payslip-bulk">
            {reports.map((report, key)=>(
                <div className="mb-2" key={key}>
                    <div onClick={onShow} className="payslip-bulk-header">
                        <div className="text-truncate">{report?.attributes?.user?.attributes?.name}</div>
                    </div>
                    <Payslip report={report}/>
                </div>
            ))}
        </div>
    )
}