import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { api } from "../request/Api";

export const UpcomingPayroll = () =>{
    const [periodFrom, setPeriodFrom]  = useState();
    const [periodTo, setPeriodTo]  = useState();
    const [net, setNet]  = useState(0);
    const [pendingReport, setPendingReport]  = useState(0);

    const navigate = useNavigate();

    const toPendingReport = () =>{
        if(pendingReport <= 0) return;
        navigate(routes.workspace().nested().approveBulkReport());
    }

    useEffect(()=>{
        api.report.listBulkReports().then((response)=>{
            const report = response.data.data[0];
            setPeriodFrom(new Date(report.attributes.periodFrom).toDateString());
            setPeriodTo(new Date(report.attributes.periodTo).toDateString());
            let total = 0;
            response.data.data.forEach((rep)=>{
                total += parseFloat(rep.attributes.net);
            });
            setNet(total);
        }).catch((error)=>{

        });
        api.report.listPendingBulkReports().then((response)=>{
            setPendingReport(response.data.data.length);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="bg-white shadow rounded-3 p-3 w-100">
            <div className="border-2 border-bottom fw-bold pb-3 mb-2">Upcoming payroll</div>
            <div className="d-flex">
                <div>
                    <div className="d-flex align-items-center">
                        <div className="h4">Pending report</div>
                        <div onClick={toPendingReport} className="bg-light rounded-3 small ms-3 px-2 shadow-sm pointer"><b>{pendingReport}</b> Reports</div>
                    </div>
                    <div className="bg-light rounded-3 shadow-sm my-3 p-2 text-nowrap">
                        <div className="d-flex w-100">
                            <div className="small">Last pay period</div>
                            <div className="w-100 fw-bold text-end">${net}</div>
                        </div>
                        <div className="d-flex">
                            <div className="fw-bold me-3">{periodFrom}</div>
                            <div className="fw-bold">{periodTo}</div>
                        </div>
                    </div>
                    <button onClick={()=>navigate(routes.workspace().nested().bulkReportOptions())} className="btn btn-sm btn-dark w-100 shadow">Run payroll</button>
                </div>
                <div className="mx-3 border"></div>
                <div className="text-nowrap">
                    <div className="mb-2 small fw-bold">Payroll actions</div>
                    <button onClick={()=>navigate(routes.workspace().nested().bulkReport())} className="btn btn-sm btn-dark w-100 my-1 shadow d-block">New off cycle payroll</button>
                </div>
            </div>
        </div>
    )
}