import React, { useCallback, useEffect, useState } from "react";
import { TiArrowRight } from "react-icons/ti";
import { MdOutlineUpdate } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { api } from "../request/Api";


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

    if(loading){
        return(
            <div>Last payroll stats</div>
        );
    }

    return(
        <div>
            <div className="border d-inline-block bg-white py-3 px-4 mt-4 rounded-3 me-3">
                <div className="d-flex align-items-center">
                    <div className="small me-3">
                        <MdOutlineUpdate className="display-1" />
                    </div>
                    <div className="small me-3">
                        <div className="text-muted">Last pay period</div>
                        <div className="d-flex align-items-center fw-bold">{periodFrom}<TiArrowRight className="mx-1" />{periodTo}</div>
                    </div>
                    <div className="small ms-3">
                        <div className="text-muted">Date</div>
                        <div className="fw-bold">{date}</div>
                    </div>
                </div>
            </div>
            <div className="border d-inline-block bg-white py-3 px-4 mb-4 rounded-3">
                <div className="d-flex align-items-center">
                    <div className="me-3">
                        <SiCashapp className="display-1" />
                    </div>
                    <div className="ms-3">
                        <div className="small">Last payroll</div>
                        <div className="fw-boldf h4">${net}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}