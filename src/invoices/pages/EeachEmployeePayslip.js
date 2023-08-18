import React, { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { useParams } from "react-router-dom";
import { routes } from "../../router/routes";
import { PayslipBuilder } from "../components/PayslipBuilder";
import { InvoiceLayout } from "../../layout/InvoiceLayout";

export const EeachEmployeePayslip = () =>{
    const [reports, setReports] = useState([]);

    const params = useParams();

    useEffect(()=>{
        api.report.listEachReportByIdArray(routes.utils.parse(params.eachReportId)).then((response)=>{
            setReports(response.data.data);
        }).catch((error)=>{

        });
    }, [params]);

    return(
        <InvoiceLayout>
            <PayslipBuilder reports={reports}/>
        </InvoiceLayout>
    )
}