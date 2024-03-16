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
import { BiCalendar } from "../components/BiCalendar";

export const CreateBulkReportFromLastReports = () =>{
    const { loading, setLoading, addPreviousHistory } = useDocument();

    const [reports, setReports] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const navigate = useNavigate();

    const reportContainerRef = useRef();
    
    const onGenerateBulkReport = async() =>{
        setLoading(true);

        const data = {
            reports: reportPayload.payload().list(),
        }
        if(!data.reports.length){ 
            setLoading(false);
            return toast.warning('Generating Blulk Report', 'No report selected.');
        }
        console.log(data);
        api.report.bulkCreate(data).then((response)=>{
            console.log(response);
            const reportIdArray = response.data.data.map((r)=>r.id);
            toast.success('Generating Blulk Report', 'Successful.');

            addPreviousHistory({
                title: 'Blulk Invoice', 
                id: reportIdArray.join(''),
                action: ()=> {
                    navigate(routes.workspace().nested().eachEmployeePayslip(routes.utils.stringify(reportIdArray)));
                }
            })?.();

            $('[data-notification-icon]').hide();
            $('[data-report-row-container]').removeClass('alert alert-danger p-0');
        }).catch((error)=>{
            console.log(error);
            toast.error('Generating Blulk Report', error);
        }).finally(()=>{
            setLoading(false);
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
        $(reportContainerRef.current).find('input[type=checkbox]').each((i, child)=>{
            child.checked = selectAll;
            const container = $(child).parent().parent().parent().find('[data-report-row-container]');
            const reportId = container.find('input[name=reportId]').val();
            if(child.checked) reportPayload.removeExcluded(reportId);
            else reportPayload.addExcluded(reportId);
        });
    }, [selectAll]);
    
    useEffect(()=>{
        setLoading(true);
        api.report.listBulkReports().then((response)=>{
            console.log(response);
            setReports(response.data.data);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <Pagination 
            beginChildren={<Generate onGenerate={onGenerateBulkReport} disabled={loading}/>} 
            title="Generate Bulk Report"
            searchTargetContainer={$('[data-report-children-container]')}
            onDateSearch={searchByDate}
        >
            <div className="d-flex bg-light border p-1 my-2 fw-bold">
                <div className="border-end px-2">
                    <span onClick={()=>setSelectAll(!selectAll)}>
                        <HiViewfinderCircle className={`fake-checkbox ${selectAll?'bg-primary text-white':''}`}/>
                    </span>
                </div>
                <div className="w-25 border-end px-2">Name</div>
                <div className="w-25 border-end px-2">Date</div>
                <div className="w-25 border-end px-2">Salary</div>
                <div className="w-25 border-end px-2">Net</div>
                <div className="w-25 border-end px-2">Allowances</div>
                <div className="w-25 border-end px-2">Deductions</div>
                <div className="w-25 px-2">YTD</div>
            </div>
            <div ref={reportContainerRef} data-report-children-container="">
                {reports.map((rept, key)=>(
                    <ReportInstanceRow report={rept} key={key}/>
                ))}
            </div>
        </Pagination>
    )
}

const Generate = ({onGenerate, disabled}) =>{
    const { addPreviousHistory } = useDocument();
    const [isActive, setIsActive] = useState(true);
    const [dateRange, setDateRange] = useState({from: '', to: ''});

    const navigate = useNavigate();

    const overlayRef = useRef();
    const errorRef = useRef();

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
                navigate(routes.workspace().nested().eachEmployeePayslip(routes.utils.stringify(reportIdArray)));
            }
        })?.();
    }

    const toggleCollapsAll = (state) =>{
        $('[data-report-row-container]').each((i, child)=>{
            isActive ? $(child).show('fast').trigger('show') : $(child).hide('fast').trigger('hide');
        });
        setIsActive(state);
    }

    const updateEachReport = () =>{
        const from = new DateHelper().sqlStringToInput(new DateHelper(dateRange.from).toSqlString());
        const to = new DateHelper().sqlStringToInput(new DateHelper(dateRange.to).toSqlString());
        $('[data-report-row-container]').find('[data-report-period]').each((i, row)=>{
            $(row).find('input[name=from]').val(from);
            $(row).find('input[name=to]').val(to);
        });
    }

    const openOverlay = () =>{
        $(overlayRef.current).show('fast');
        $(errorRef.current).hide('fast');
    }

    const onTriggerGenerate = () =>{
        if(disabled) return;
        if(!dateRange.from) return $(errorRef.current).show('fast').text('Invalid date (from)');
        if(!dateRange.to) return $(errorRef.current).show('fast').text('Invalid date (to)');
        $(overlayRef.current).hide('fast');
        updateEachReport();
        onGenerate?.();
    }

    return(
        <div className="d-flex align-items-center">
            <button onClick={()=>toggleCollapsAll(!isActive)} className="btn btn-sm btn-outline-primary px-2 py-1 me-2">{isActive? 'Expand': 'Collaps'} All <BsArrowsCollapse/></button>   
            <button onClick={openOverlay} className="btn btn-sm btn-outline-success px-2 py-1 me-2">Clone Reports <BiSolidReport/></button>      
            <button onClick={onSeeInvoices} className="btn btn-sm btn-outline-warning px-2 py-1">Invoices <FaFileInvoiceDollar/></button>
            <div ref={overlayRef} onClick={()=>$(overlayRef.current).hide('fast')} className="backdrop position-absolute top-0 start-0 vw-100 vh-100" style={{display: 'none'}}>
                <div onClick={(e)=>e.stopPropagation()} className="position-absolute top-50 start-50 translate-middle text-end bg-light py-4 px-5 rounded-3 shadow-sm">
                    <div onChange={()=>$(errorRef.current).hide('fast')} className="allowance-row bg-transparent py-3" style={{width: '445px'}}>
                        <div className="text-start fw-bold text-wrap mb-3">What period do you want to create your records from for the cloning of employee records.</div>
                        <div ref={errorRef} className="alert alert-danger text-start" style={{display: 'none'}}></div>
                        <BiCalendar onSelect={(s, e)=>setDateRange({from: s.dateInstance, to: e.dateInstance})} inlineMode />
                    </div>
                    <div className="text-center mt-2">
                        <div onClick={onTriggerGenerate} className="btn btn-sm btn-primary px-3">Generate Report</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ReportInstanceRow = ({report}) =>{
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const checkedRef = useRef();
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

    const onSelectChecked = (e) =>{
        const reportId = $(containerRef.current).find('input[name=reportId]').val();
        if(e.target.checked) reportPayload.removeExcluded(reportId);
        else reportPayload.addExcluded(reportId);
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
                <div className="position-absolute text-danger fs-5 end-0" style={{top: '-8px', zIndex: '8888', display: 'none'}} data-notification-icon="">
                    <IoNotificationsCircleOutline/>
                </div>
                <div onClick={(e)=>e.stopPropagation()} className="d-flex align-items-center border-end px-2">
                    <input ref={checkedRef} onChange={onSelectChecked} className="form-check-input pointer me-2" type="checkbox" defaultChecked={true} />
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
            <input hidden name="reportId" onChange={()=>{}} value={report?.id} />
        </div>
    )
}


