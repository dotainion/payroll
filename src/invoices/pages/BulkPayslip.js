import React, { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { useParams } from "react-router-dom";
import { PayslipBuilder } from "../components/PayslipBuilder";
import { InvoiceLayout } from "../../layout/InvoiceLayout";
import { PayslipSwitcher } from "../components/PayslipSwitcher";

export const BulkPayslip = () =>{
    const [reports, setReports] = useState([]);

    const params = useParams();

    useEffect(()=>{
        api.report.listBulkReports(params?.reportId).then((response)=>{
            setReports(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <InvoiceLayout>
            <PayslipSwitcher reports={reports}>
                <PayslipBuilder reports={reports}/>
            </PayslipSwitcher>
        </InvoiceLayout>
    )
}