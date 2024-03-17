import React, { useEffect, useState } from "react";
import { BiSolidReport } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../router/routes";

export const ReportApprovalConformation = () =>{
    const [stats, setStats] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        const data = location.state;
        if(!data) return;
        setStats(location.state);
    }, []);

    if(!stats) return(
        <div className="d-flex align-items-center justify-content-center my-5">
            <div className="bg-white p-4 text-center">Records not found</div>
        </div>
    )
    return(
        <div className="container">
            <div className="d-flex align-items-center justify-content-center">
                <div className="text-center bg-white p-5 mt-4 shadow-sm rounded-3">
                    <div className="display-5 mb-3 fw-bold text-success">Success</div>
                    <div className="d-flex">
                        <div className="fs-5 border-end border-3 pe-3">
                            <div className="d-flex">
                                <div>People</div>
                                <div className="fw-bold ms-3">{stats?.people}</div>
                            </div>
                            <div className="d-flex">
                                <div>Allowance</div>
                                <div className="fw-bold ms-3">{stats?.allowance}</div>
                            </div>
                            <div className="d-flex">
                                <div>Deduction</div>
                                <div className="fw-bold ms-3">{stats?.deduction}</div>
                            </div>
                            <div className="d-flex">
                                <div>Tax Withheld</div>
                                <div className="fw-bold ms-3">{stats?.tax}</div>
                            </div>
                        </div>
                        <div className="ms-4">
                            <BiSolidReport style={{fontSize: '100px'}} />
                        </div>
                    </div>
                    <button onClick={()=>navigate(routes.workspace().nested().dashboard())} className="btn btn-dark rounded-0 px-5 mt-4">Done</button>
                </div>
            </div>
        </div>
    )
}