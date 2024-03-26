import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { api } from "../request/Api";
import $ from 'jquery';

export const UpcomingPayroll = () =>{
    const [periodFrom, setPeriodFrom]  = useState();
    const [periodTo, setPeriodTo]  = useState();
    const [net, setNet]  = useState(0);
    const [pendingReport, setPendingReport]  = useState(0);
    const [pending1, setPending1]  = useState(true);
    const [pending2, setPending2]  = useState(true);

    const navigate = useNavigate();

    const toPendingReport = () =>{
        if(pendingReport <= 0) return;
        navigate(routes.workspace().nested().approveBulkReport());
    }

    useEffect(()=>{
        if(!pending1 && !pending2){
            $('.pd-page').removeClass('pd-page');
        }
    }, [pending1, pending2]);

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

        }).finally(()=>{
            setPending1(false);
        });
        api.report.listPendingBulkReports().then((response)=>{
            setPendingReport(response.data.data.length);
        }).catch((error)=>{

        }).finally(()=>{
            setPending2(false);
        });
    }, []);

    return(
        <div className="bg-white shadow rounded-3 p-3 w-100">
            <div className="pd-c border-2 border-bottom fw-bold pb-3 mb-2">Payroll</div>
            <div className="d-flex">
                <div>
                    <div className="d-flex align-items-center">
                        <div className="pd-c h4">Pending report</div>
                        <div onClick={toPendingReport} className="pd-c bg-light rounded-3 small ms-3 px-2 shadow-sm pointer"><b>{pendingReport}</b> Reports</div>
                    </div>
                    <div className="bg-light rounded-3 shadow-sm my-3 p-2 text-nowrap">
                        <div className="d-flex w-100">
                            <div className="pd-c small">Last pay period</div>
                            <div className="pd-c w-100 fw-bold text-end">${parseFloat(net).toFixed(2)}</div>
                        </div>
                        <div className="d-flex">
                            <div className="pd-c fw-bold me-3">{periodFrom}</div>
                            <div className="pd-c fw-bold">{periodTo}</div>
                        </div>
                    </div>
                    <button onClick={()=>navigate(routes.workspace().nested().bulkReportOptions())} className="pd-c btn btn-sm btn-dark w-100 shadow">Run payroll</button>
                </div>
                <div className="mx-3 border"></div>
                <div className="text-nowrap">
                    <div className="pd-c mb-2 small fw-bold">Payroll actions</div>
                    <button onClick={()=>navigate(routes.workspace().nested().bulkReport())} className="pd-c btn btn-sm btn-dark w-100 my-1 shadow d-block">New off cycle payroll</button>
                </div>
            </div>
        </div>
    )
}