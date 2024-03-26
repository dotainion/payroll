import React, { useCallback, useEffect, useState } from "react";
import { TiArrowRight } from "react-icons/ti";
import { MdOutlineUpdate } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { api } from "../request/Api";
import $ from 'jquery';

export const ReportOptionsHeader = () =>{
    const [periodFrom, setPeriodFrom]  = useState();
    const [periodTo, setPeriodTo]  = useState();
    const [net, setNet]  = useState(0);
    const [date, setDate]  = useState();
    const [loading, setLoding]  = useState(false);

    const loadRequirements = useCallback(()=>{
        setLoding(true);
        api.report.listBulkReports().then((response)=>{
            const report = response.data.data[0];
            setPeriodFrom(new Date(report.attributes.periodFrom).toDateString());
            setPeriodTo(new Date(report.attributes.periodTo).toDateString());
            let total = 0;
            response.data.data.forEach((rep)=>{
                total += parseFloat(rep.attributes.net);
            });
            setNet(total);
            setDate(new Date(report.attributes.date).toDateString());
            setLoding(false);
        }).catch((error)=>{

        });
    }, []);

    useEffect(()=>{
        loadRequirements();
    }, []);

    useEffect(()=>{
        if(loading) return;
        $('.pd-page').removeClass('pd-page');
    }, [loading]);

    return(
        <div className="pd-page">
            <div className="border d-inline-block bg-white py-3 px-4 mt-4 rounded-3 me-3">
                <div className="d-flex align-items-center">
                    <div className="pd-svg small me-3">
                        <MdOutlineUpdate className="display-1" />
                    </div>
                    <div className="small me-3">
                        <div className="pd-c text-muted">Last pay period</div>
                        <div className="pd-c d-flex align-items-center fw-bold">{periodFrom}<TiArrowRight className="mx-1" />{periodTo}</div>
                    </div>
                    <div className="small ms-3">
                        <div className="pd-c text-muted">Date</div>
                        <div className="pd-c fw-bold">{date}</div>
                    </div>
                </div>
            </div>
            <div className="border d-inline-block bg-white py-3 px-4 mb-4 rounded-3">
                <div className="d-flex align-items-center">
                    <div className="pd-svg me-3">
                        <SiCashapp className="display-1" />
                    </div>
                    <div className="ms-3">
                        <div className="pd-c small">Last payroll</div>
                        <div className="pd-c fw-boldf h4">${net.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}