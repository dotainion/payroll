import React, { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { useParams } from "react-router-dom";
import { PayslipBuilder } from "../components/PayslipBuilder";
import { InvoiceLayout } from "../../layout/InvoiceLayout";

export const BulkPayslip = () =>{
    const [reports, setReports] = useState([1,1]);

    const params = useParams();

    useEffect(()=>{
        api.report.listBulkReports(params?.reportId).then((response)=>{
            setReports(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <InvoiceLayout>
            <PayslipBuilder reports={reports}/>
        </InvoiceLayout>
    )
}