import React, { useRef } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { api } from "../request/Api";
import { toast } from "../utils/Toast";

export const SalaryProrate = () =>{

    const prorateRef = useRef();
    
    const idRef = useRef();
    const biMonthlyRef = useRef();
    const offRef = useRef();

    const setProrate = () =>{
        const data = {
            id: idRef.current,
            biMonthly: biMonthlyRef.current.checked,
            off: offRef.current.checked,
        };
        api.settings.setProrateSettings(data).then((response)=>{
            idRef.current = response.data.data[0].id;
        }).catch((error)=>{
            toast.error('Salary Prorate', error);
        });
    }

    useEffect(()=>{
        $(prorateRef.current).show('fast');
        api.settings.fetchProrateSettings().then((response)=>{
            const prorate = response.data.data[0];
            idRef.current = prorate.id;
            if(prorate.attributes.off) offRef.current.checked = true;
            if(prorate.attributes.biMonthly) biMonthlyRef.current.checked = true;
        }).catch((error)=>{
            offRef.current.checked = true;
        });
    }, []);

    return(
        <div ref={prorateRef} className="text-wrap" style={{display: 'none'}}>
            <div className="h5 my-4">Prorate Salary on Payroll Reports</div>
            
            <div className="my-3 text-muted">
                <div className="fw-bold">Prorate of partial billing cycle</div>
                <div>Prorating a report in the middle of a billing cycle con be done when generating or editing a report</div>
            </div>

            <div className="my-3">
                <label className="btn btn-light d-flex align-items-center">
                    <div className="d-flex align-items-center" style={{minWidth: '30px'}}>
                        <input ref={offRef} onChange={setProrate} type="radio" name="prorate" style={{width: '20px', height: '20px'}} />
                    </div>
                    <div className="fw-bold">Full salary report / Off</div>
                </label>
                <div className="d-flex align-items-center">
                    <div className="ms-3" style={{minWidth: '30px'}}></div>
                    <div className="text-muted">
                        <div>No suported at this time</div>
                    </div>
                </div>
            </div>

            <div className="my-3">
                <label className="btn btn-light d-flex align-items-center">
                    <div className="d-flex align-items-center" style={{minWidth: '30px'}}>
                        <input ref={biMonthlyRef} onChange={setProrate} type="radio" name="prorate" style={{width: '20px', height: '20px'}} />
                    </div>
                    <div className="fw-bold">Split base salary / Bi-Monthly</div>
                </label>
                <div className="d-flex align-items-center">
                    <div className="ms-3" style={{minWidth: '30px'}}></div>
                    <div>
                        <div className="text-muted">
                            <div>Split payroll is the process of paying employees on two intervals, it divides their pay salary between in two.</div>
                            <div>Eg: Jane base salary is $2000, each payroll run will have a record salary of $1000.</div>
                            <div>This is recomended for companies that is currently have a monthly payroll system and want to switch to a bi-monthly payroll system and do not want to change employee base salary.</div>
                        </div>
                        <div className="bg-light p-2 my-2">
                            <div>NOTE: This dose not include the fallowing:</div>
                            <div>&#x2022; Allowances</div>
                            <div>&#x2022; Deductions</div>
                            <div>&#x2022; Pay leaves</div>
                            <div>&#x2022; No pay leaves</div>
                            <div>&#x2022; Sick leave</div>
                            <div>&#x2022; Etc</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
