import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from "../router/routes";
import { BsFillPersonFill } from "react-icons/bs";
import { Print } from "../invoices/components/Print";
import { ToPrintAndDownload } from "../invoices/components/ToPrintAndDownload";
import { Download } from "../invoices/components/Download";
import { SendMail } from "../invoices/components/SendMail";

export const InvoiceLayout = ({children}) =>{
    const navigate = useNavigate();
    const location = useLocation();

    const pageRef = useRef();

    const menus = [
        {
            title: 'Last Payslips',
            icon: BsFillPersonFill,
            active: routes.workspace().nested().bulkPayslip(),
            onClick: ()=>navigate(routes.workspace().nested().bulkPayslip())
        },
    ];

    useEffect(()=>{
        
    }, []);

    return(
        <div className="bg-white">
            <div className="d-flex align-items-center border-bottom w-100 px-2 pt-1 text-nowrap">
                {menus.map((menu, key)=>(
                    <button 
                        onClick={menu.onClick} 
                        className={`btn btn-white shadow-none border-bottom border-0 rounded-0 border-4 px-3 ${location.pathname.includes(menu.active)?'border-info':'border-white'}`}
                        key={key}
                    >{menu.title}</button>
                ))}
                <div className="d-flex w-100 align-items-center justify-content-end">
                    <SendMail targetRef={pageRef} className="btn btn-sm btn-outline-info mx-2 px-2" title={'Send Mail'}/>
                    <Print targetRef={pageRef} className={'btn btn-sm btn-outline-info mx-2 px-4'} title={'Print'}/>
                    <Download targetRef={pageRef} className="btn btn-sm btn-outline-info mx-2" title={'Download'}/>
                </div>
            </div>
            <ToPrintAndDownload ref={pageRef}>
                {children}
            </ToPrintAndDownload>
        </div>
    )
}