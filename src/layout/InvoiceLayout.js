import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from "../router/routes";
import { BsDashLg, BsFillPersonFill } from "react-icons/bs";
import { Print } from "../invoices/components/Print";
import { ToPrintAndDownload } from "../invoices/components/ToPrintAndDownload";
import { Download } from "../invoices/components/Download";
import { SendMail } from "../invoices/components/SendMail";
import { useWorkspace } from "./WorkspaceLayout";
import { TbReportMoney } from 'react-icons/tb';
import { FaSitemap } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import $ from 'jquery';
import { EllipsisOption } from "../widgets/EllipsisOption";
import { api } from "../request/Api";
import { DateHelper } from "../utils/DateHelper";

export const InvoiceLayout = ({children, onPeriodSelect, hidePeriodSelection}) =>{
    const { setPayslipPages, payslipSelectOptions } = useWorkspace();

    const [periods, setPeriods] = useState([]);
    
    const navigate = useNavigate();
    const location = useLocation();

    const pageRef = useRef();
    const titleRef = useRef();

    const fromRef = useRef();
    const toRef = useRef();

    const menus = [
        {
            title: 'List Last Payslips generated',
            onClick: ()=>navigate(routes.workspace().nested().bulkPayslip())
        },
    ];

    const toCamelUpper = (value) =>{
        const test = value.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
        const test2 = test.split(' ');
        const test3 = test2.map((str)=>{
            return str.charAt(0).toUpperCase() + str.slice(1);
        });
        return test3.join(' ');
    }

    const onAddPage = (value, e) =>{
        setPayslipPages(value);
        $(titleRef.current).html($(e.currentTarget).html());
    }

    const onSelectedPeriod = (period) =>{
        fromRef.current.value = period?.attributes?.from?.split(' ')?.[0];
        toRef.current.value = period?.attributes?.to?.split(' ')?.[0];
        onSearchByPeriod();
    }

    const onSearchByPeriod = () =>{
        $(fromRef.current).removeClass('border border-danger');
        $(toRef.current).removeClass('border border-danger');
        if(!fromRef.current.valueAsDate) return;
        if(!toRef.current.valueAsDate) return;
        if(toRef.current.valueAsDate <= fromRef.current.valueAsDate){
            $(fromRef.current).addClass('border border-danger');
            return $(toRef.current).addClass('border border-danger');
        }
        const data = {
            from: new DateHelper(fromRef.current.valueAsDate).toSqlString(),
            to: new DateHelper(toRef.current.valueAsDate).toSqlString()
        }
        onPeriodSelect?.(data);
    }

    useEffect(()=>{
        setPayslipPages('payslip');
        api.report.listPeriods().then((response)=>{
            setPeriods(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="bg-white">
            <div className="d-flex align-items-center border-bottom w-100 px-2 pt-1 text-nowrap">
                <Dropdown className="payslip-layout-dropdown border border-info">
                    <Dropdown.Toggle variant="light" className="btn btn-white text-start shadow-none border-bottom border-0 rounded-0 border-4 px-3 border-info">
                        <span ref={titleRef} className="d-flex align-items-center">Select Reports</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e)=>onAddPage('payslip', e)} className="d-flex align-items-center">
                            <div className="w-100">Payslips</div>
                            <TbReportMoney/>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>onAddPage('itemize', e)} className="d-flex align-items-center">
                            <div className="w-100">Itemize</div>
                            <FaSitemap/>
                        </Dropdown.Item>
                        {payslipSelectOptions?.map((item, key)=>(
                            <Dropdown.Item onClick={(e)=>onAddPage(item, e)} key={key}>{toCamelUpper(item)}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                {!hidePeriodSelection && <Dropdown className="payslip-layout-dropdown border border-info">
                    <Dropdown.Toggle variant="light" className="btn btn-white text-start shadow-none border-bottom border-0 rounded-0 border-4 px-3 border-info">
                        <span className="d-flex align-items-center">Select a period</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div className="d-flex align-items-center px-3 pb-1">
                            <div>
                                <small>From</small>
                                <input ref={fromRef} onChange={onSearchByPeriod} className="form-control shadow-none me-1" type="date" onClick={(e)=>$(e.target).focus()} />
                            </div>
                            <div>
                                <small className="ms-1">To</small>
                                <input ref={toRef} onChange={onSearchByPeriod} className="form-control shadow-none ms-1" type="date" onClick={(e)=>$(e.target).focus()} />
                            </div>
                        </div>
                        {periods.map((period, key)=>(
                            <Dropdown.Item onClick={(e)=>onSelectedPeriod(period)} key={key}>
                                <div className="d-flex align-items-center w-100">
                                    <div className="w-50 text-end">{period?.attributes?.from?.split(' ')?.[0]}</div>
                                    <div className="mx-3"><BsDashLg/></div>
                                    <div className="w-50 text-start">{period?.attributes?.to?.split(' ')?.[0]}</div>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>}

                <div className="d-flex w-100 align-items-center justify-content-end">
                    <SendMail targetRef={pageRef} className="btn btn-sm btn-outline-info mx-2 px-2" title={'Send Mail'}/>
                    <Print targetRef={pageRef} className={'btn btn-sm btn-outline-info mx-2 px-4'} title={'Print'}/>
                    <Download targetRef={pageRef} className="btn btn-sm btn-outline-info mx-2" title={'Download'}/>
                </div>

                <EllipsisOption option={menus}/>
            </div>
            <ToPrintAndDownload ref={pageRef}>
                {children}
            </ToPrintAndDownload>
        </div>
    )
}