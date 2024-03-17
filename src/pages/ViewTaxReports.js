import React, { memo, useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { BiCalendar } from "../components/BiCalendar";
import { Dropdown } from "react-bootstrap";
import { EllipsisOption } from "../widgets/EllipsisOption";
import { FiEdit } from "react-icons/fi";
import { BiSolidReport } from "react-icons/bi";
import { ReportExpandableColumn } from "../components/ReportExpandableColumn";
import { PageNavbar } from "../components/PageNavbar";
import { api } from "../request/Api";
import { useDocument } from "../contents/DocumentProvider";
import { BsArrowsExpand } from "react-icons/bs";
import { BsArrowsCollapse } from "react-icons/bs";
import { DateHelper } from "../utils/DateHelper";


const prev = new Date();
prev.setDate(prev.getDate() - 30);
const period = {
    from: new DateHelper(prev).toSqlString(), 
    to: new DateHelper(new Date()).toSqlString()
}

export const ViewTaxReports = () =>{
    const { setLoading } = useDocument();

    const [taxDeductions, setTaxDeductions] = useState([]);

    const navigate = useNavigate();

    const startRef = useRef();
    const endRef = useRef();
    const userRef = useRef();

    const searchByUser = useCallback(() =>{
        const from = startRef.current;
        const to = endRef.current;
        if(!from || !to) return;
        api.report.searchByDate(from, to).then((response)=>{
            let listTaxDeductions = [];
            response.data.data.forEach((r)=>{
                r.attributes.allDeductions.forEach((d)=>{
                    if(d.type === 'tax') listTaxDeductions.push(d);
                })
            });
            setTaxDeductions(listTaxDeductions);
        }).catch((error)=>{
            console.log(error);
            setTaxDeductions([]);
        }).finally(()=>{
            setLoading(false);
        });
    });

    const onDateSelect = useCallback((start, end) =>{
        startRef.current = new DateHelper(start.dateInstance).toSqlString();
        endRef.current = new DateHelper(end.dateInstance).toSqlString();
        searchByUser();
    });

    useEffect(()=>{
        
    }, []);
    return(
        <div className="page bg-lightgray w-100">
            <PageNavbar/>
            <div onChange={searchByUser} className="container mb-3">
                <div className="allowance-row bg-transparent py-3" style={{width: '400px'}}>
                    <label>Period <span className="text-danger">*</span></label>
                    <BiCalendar period={period} onSelect={onDateSelect} biMonthlyOff fireOnLoad />
                </div>
            </div>
            <div className="">
                <table className="p-3 table table-white table-striped table-bordered text-nowrap">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Tax Nubmer</th>
                            <th>Tax Withheld</th>
                            <th>YTD</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxDeductions.map((rept, key)=>(
                            <tr className="table-row striped" key={key}>
                                <td>{new Date(rept?.attributes?.date).toDateString()}</td>
                                <td>{rept?.attributes?.number}</td>
                                <td>{parseFloat(rept?.attributes?.amount || 0).toFixed(2)}</td>
                                <td>{parseFloat(rept?.attributes?.ytd || 0).toFixed(2)}</td>
                                <td><button onClick={()=>navigate(routes.workspace().nested().editReport(rept?.attributes?.reportId))} className="btn btn-sm btn-dark">View report</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

