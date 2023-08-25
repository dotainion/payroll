import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from "../router/routes";
import { BsFillPersonFill } from "react-icons/bs";
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

export const InvoiceLayout = ({children}) =>{
    const { setPayslipPages, payslipSelectOptions } = useWorkspace();
    
    const navigate = useNavigate();
    const location = useLocation();

    const pageRef = useRef();
    const titleRef = useRef();

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

    const menus = [
        {
            title: 'List Last Payslips generated',
            onClick: ()=>navigate(routes.workspace().nested().bulkPayslip())
        },
    ];

    useEffect(()=>{
        setPayslipPages('payslip');
    }, []);

    return(
        <div className="bg-white">
            <div className="d-flex align-items-center border-bottom w-100 px-2 pt-1 text-nowrap">
                <Dropdown className="payslip-layout-dropdown">
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