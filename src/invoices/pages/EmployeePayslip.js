import React, { useEffect, useState } from "react";
import { Payslip } from "../components/Payslip";
import { api } from "../../request/Api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { InvoiceLayout } from "../../layout/InvoiceLayout";
import { PayslipSwitcher } from "../components/PayslipSwitcher";

export const EmployeePayslip = () =>{
    const [report, setReport] = useState();

    const params = useParams();

    useEffect(()=>{
        api.report.report(params?.reportId).then((response)=>{
            setReport(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    return(
        <InvoiceLayout hidePeriodSelection>
            <PayslipSwitcher reports={[report]}>
                <Payslip report={report} />
            </PayslipSwitcher>
        </InvoiceLayout>
    )
}