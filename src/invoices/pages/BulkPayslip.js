import React, { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { useParams } from "react-router-dom";
import { PayslipBuilder } from "../components/PayslipBuilder";
import { InvoiceLayout } from "../../layout/InvoiceLayout";
import { PayslipSwitcher } from "../components/PayslipSwitcher";

export const BulkPayslip = () =>{
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [rawReports, setRawReports] = useState([]);

    const params = useParams();

    const parseUsers = (records) =>{
        const usrs = records?.map((r)=>r.attributes.user);
        setUsers(usrs);
    }

    const filterUsers = (records) =>{
        const filteredReports = rawReports?.filter((r)=>records.includes(r.attributes.user.id));
        setReports(filteredReports);
    }

    const onSearchByPeriod = (data) =>{
        api.report.searchByDate(data.from, data.to).then((response)=>{
            setRawReports(response.data.data);
            parseUsers(response.data.data);
            filterUsers(response.data.data);
        }).catch((error)=>{

        });
    }

    useEffect(()=>{
        api.report.listBulkReports(params?.reportId).then((response)=>{
            setReports(response.data.data);
            setRawReports(response.data.data);
            parseUsers(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <InvoiceLayout onPeriodSelect={onSearchByPeriod} users={users} onUserFilter={filterUsers}>
            <PayslipSwitcher reports={reports}>
                <PayslipBuilder reports={reports}/>
            </PayslipSwitcher>
        </InvoiceLayout>
    )
}