import React, { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { Pagination } from "../components/Pagination";
import { ReportInstance } from "../components/ReportInstance";
import $ from 'jquery';
import { EllipsisOption } from "../widgets/EllipsisOption";
import { Dropdown } from "react-bootstrap";
import { HiViewfinderCircle } from 'react-icons/hi2';
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { reportPayload } from "../utils/ReportPayload";
import { BiSolidReport } from "react-icons/bi";
import { BsArrowsCollapse } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { DateHelper } from "../utils/DateHelper";
import { useDocument } from "../contents/DocumentProvider";

export const CreateBulkReport = () =>{
    const [reports, setReports] = useState([]);

    const navigate = useNavigate();
    
    const onGenerateBulkReport = () =>{
        const data = {
            reports: reportPayload.payload().list(),
        }
        console.log(data);
        api.report.bulkCreate(data).then((response)=>{
            console.log(response);
            const reportIdArray = response.data.data.map((r)=>r.id);
            toast.success('Generating Blulk Report', 'Successful.');
            navigate(routes.workspace().nested().eachEmployeePayslip(routes.utils.stringify(reportIdArray)));
        }).catch((error)=>{
            console.log(error);
            toast.error('Generating Blulk Report', error);
        });
    }

    const searchByDate = (date) =>{
        const from = new DateHelper(date.from).toSqlString();
        const to = new DateHelper(date.to).toSqlString();
        api.report.searchByDate(from, to).then((response)=>{
            console.log(response.data.data);
            setReports(response.data.data);
        }).catch((error)=>{
            toast.error('Generating Blulk Report', error);
        });
    }
    
    useEffect(()=>{
        api.report.listBulkReports().then((response)=>{
            console.log(response);
            setReports(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return(
        <Pagination 
            beginChildren={<Generate onGenerate={onGenerateBulkReport}/>} 
            title="Generate Bulk Report"
            searchTargetContainer={$('[data-report-children-container]')}
            onDateSearch={searchByDate}
        >
            <div className="d-flex bg-light border p-1 my-2 fw-bold">
                <div className="border-end px-2"><HiViewfinderCircle/></div>
                <div className="w-25 border-end px-2">Name</div>
                <div className="w-25 border-end px-2">Date</div>
                <div className="w-25 border-end px-2">Salary</div>
                <div className="w-25 border-end px-2">Net</div>
                <div className="w-25 border-end px-2">Allowances</div>
                <div className="w-25 border-end px-2">Deductions</div>
                <div className="w-25 px-2">YTD</div>
            </div>
            <div data-report-children-container="">
                {reports.map((rept, key)=>(
                    <ReportInstanceRow report={rept} key={key}/>
                ))}
            </div>
        </Pagination>
    )
}

const Generate = ({onGenerate}) =>{
    const { addPreviousHistory } = useDocument();
    const [isActive, setIsActive] = useState(true);

    const navigate = useNavigate();

    const onSeeInvoices = () =>{
        let reportIdArray = [];
        $('[data-report-children-container]').children().each((i, child)=>{
            reportIdArray.push($(child).find('input[name=reportId]').val());
        });
        if(!reportIdArray.length) return toast.warning('Invoice', 'No report selected.');
        addPreviousHistory({
            title: 'Invoice', 
            id: reportIdArray.join(''),
            action: ()=> {
                console.log('hello world... thi sis a test...')
                navigate(routes.workspace().nested().eachEmployeePayslip(routes.utils.stringify(reportIdArray)));
            }
        })?.();
        //navigate(routes.workspace().nested().eachEmployeePayslip(routes.utils.stringify(reportIdArray)));
    }

    const toggleCollapsAll = (state) =>{
        $('[data-report-row-container]').each((i, child)=>{
            isActive ? $(child).show('fast').trigger('show') : $(child).hide('fast').trigger('hide');
        });
        setIsActive(state);
    }

    return(
        <div className="d-flex align-items-center">
            <button onClick={()=>toggleCollapsAll(!isActive)} className="btn btn-sm btn-outline-primary px-2 py-1 me-2">Collapse All <BsArrowsCollapse/></button>   
            <button onClick={onGenerate} className="btn btn-sm btn-outline-success px-2 py-1 me-2">Clone Reports <BiSolidReport/></button>      
            <button onClick={onSeeInvoices} className="btn btn-sm btn-outline-warning px-2 py-1">Invoices <FaFileInvoiceDollar/></button>          
        </div>
    )
}

const ReportInstanceRow = ({report}) =>{
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const reportRef = useRef();
    const containerRef = useRef();

    const onOpenCard = () =>{
        if($(containerRef.current).is(':hidden')){
            return $(containerRef.current).show('fast').trigger('show');
        }
        $(containerRef.current).hide('fast').trigger('hide');
    }

    const onSeeInvoice = () =>{
        navigate(routes.workspace().nested().employeePayslip(report?.id));
    }

    const onRemove = () =>{
        $(reportRef.current).hide('fast').promise().then(()=>{
            $(reportRef.current).remove();
        });
    }

    useEffect(()=>{
        if($(containerRef.current).attr('data-set') === 'active') return;
        $(containerRef.current).on('show', ()=>setIsOpen(true));
        $(containerRef.current).on('hide', ()=>setIsOpen(false));
        $(containerRef.current).attr('data-set', 'active');
    }, []);

    return(
        <div ref={reportRef}>
            <div onClick={onOpenCard} className="pointer bulk-report-item position-relative d-flex align-items-center border p-1 my-2" data-report-card-row="">
                <div className="position-absolute text-danger fs-5 end-0" style={{top: '-8px', zIndex: '8888'}}>
                    <IoNotificationsCircleOutline/>
                </div>
                <div onClick={(e)=>e.stopPropagation()} className="border-end px-2">
                    <EllipsisOption>
                        <Dropdown.Item hidden={isOpen} onClick={onOpenCard}>View/Edit</Dropdown.Item>
                        <Dropdown.Item hidden={isOpen} onClick={onSeeInvoice}>Invoice</Dropdown.Item>
                        <Dropdown.Item hidden={!isOpen} onClick={onOpenCard}>Close</Dropdown.Item>
                        <Dropdown.Item onClick={onRemove}>Remove</Dropdown.Item>
                    </EllipsisOption>
                </div>
                <div className="w-25 border-end px-2 text-truncate">{report?.attributes?.user?.attributes?.name}</div>
                <div className="w-25 border-end px-2 text-truncate">{new Date(report?.attributes?.date).toDateString()}</div>
                <div className="w-25 border-end px-2 text-truncate">${report?.attributes?.totalSalary || 0}</div>
                <div className="w-25 border-end px-2 text-truncate">${report?.attributes?.netSalary || 0}</div>
                <div className="w-25 border-end px-2 text-truncate">${report?.attributes?.totalAllowance || 0}</div>
                <div className="w-25 border-end px-2 text-truncate">${report?.attributes?.totalDeduction || 0}</div>
                <div className="w-25 px-2 text-truncate">${report?.attributes?.ytd || 0}</div>
            </div>
            <div ref={containerRef} data-report-row-container="" style={{display: 'none'}}>
                <ReportInstance report={report}/>
                <div className="mb-4 d-flex align-items-center justify-content-center">
                    <button onClick={onOpenCard} className="btn btn-sm btn-primary px-4 me-2">Close</button>
                    <button onClick={onRemove} className="btn btn-sm btn-danger px-3">Remove</button>
                </div>
            </div>
            <div hidden>{report?.attributes?.user?.attributes?.department}</div>
            <input hidden name="reportId" value={report?.id} />
        </div>
    )
}


