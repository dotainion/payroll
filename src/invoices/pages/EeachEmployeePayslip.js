import React, { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { useParams } from "react-router-dom";
import { routes } from "../../router/routes";
import { PayslipBuilder } from "../components/PayslipBuilder";
import { InvoiceLayout } from "../../layout/InvoiceLayout";
import { PayslipSwitcher } from "../components/PayslipSwitcher";

export const EeachEmployeePayslip = () =>{
    const [reports, setReports] = useState([]);

    const params = useParams();

    const onSearchByPeriod = (data) =>{
        api.report.searchByDate(data.from, data.to).then((response)=>{
            setReports(response.data.data);
        }).catch((error)=>{

        });
    }

    useEffect(()=>{
        api.report.listEachReportByIdArray(routes.utils.parse(params.eachReportId)).then((response)=>{
            setReports(response.data.data);
        }).catch((error)=>{

        });
    }, [params]);

    return(
        <InvoiceLayout onPeriodSelect={onSearchByPeriod}>
            <PayslipSwitcher reports={reports}>
                <PayslipBuilder reports={reports}/>
            </PayslipSwitcher>
        </InvoiceLayout>
    )
}