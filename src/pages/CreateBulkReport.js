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

const ddts = [{"id":"592ef782-6526-4d74-89ce-0a570cdd824e","type":"report","attributes":{"hide":false,"userId":"dbe82072-33cc-41d0-ac26-a41545698862","user":{"id":"dbe82072-33cc-41d0-ac26-a41545698862","type":"user","attributes":{"userId":"123","name":"Nick Blair","email":"mb.repairss@gmail.com","hide":false,"gender":"Male","number":"1234","token":null,"emergencyNumber":"1234","registrationDate":"2023-09-13 00:00:00","salary":"2000","dob":"2023-09-13 00:00:00","taxId":"252525","otRate":"25","city":"Saint Andrew","state":"Grenada","address":"tempe","department":"Accounts"}},"totalDeduction":"0","totalAllowance":"37.5","totalSalary":"2000","net":"2037.5","netSalary":"2037.5","date":"2023-09-05 02:22:46","ytd":"7952.5","periodFrom":"2023-09-05 00:00:00","periodTo":"2023-09-26 00:00:00","allAllowances":[{"id":"fa732974-0506-4971-901a-9dec52e21a59","type":"overtime","attributes":{"userId":"dbe82072-33cc-41d0-ac26-a41545698862","reportId":"592ef782-6526-4d74-89ce-0a570cdd824e","ytd":"112.5","name":"Overtime","rate":"1.5","hours":"1","date":"2023-09-05 02:22:46","hide":false,"net":"37.5","amount":"25","totalAmount":"37.5"}}],"allDeductions":[]}},{"id":"592ef782-6526-4d74-89ce-0a570cdd824e","type":"report","attributes":{"hide":false,"userId":"dbe82072-33cc-41d0-ac26-a41545698862","user":{"id":"dbe82072-33cc-41d0-ac26-a41545698862","type":"user","attributes":{"userId":"123","name":"Nick Blair","email":"mb.repairss@gmail.com","hide":false,"gender":"Male","number":"1234","token":null,"emergencyNumber":"1234","registrationDate":"2023-09-13 00:00:00","salary":"2000","dob":"2023-09-13 00:00:00","taxId":"252525","otRate":"25","city":"Saint Andrew","state":"Grenada","address":"tempe","department":"Accounts"}},"totalDeduction":"0","totalAllowance":"37.5","totalSalary":"2000","net":"2037.5","netSalary":"2037.5","date":"2023-09-05 02:22:46","ytd":"7952.5","periodFrom":"2023-09-05 00:00:00","periodTo":"2023-09-26 00:00:00","allAllowances":[{"id":"fa732974-0506-4971-901a-9dec52e21a59","type":"overtime","attributes":{"userId":"dbe82072-33cc-41d0-ac26-a41545698862","reportId":"592ef782-6526-4d74-89ce-0a570cdd824e","ytd":"112.5","name":"Overtime","rate":"1.5","hours":"1","date":"2023-09-05 02:22:46","hide":false,"net":"37.5","amount":"25","totalAmount":"37.5"}}],"allDeductions":[]}}];

export const CreateBulkReport = () =>{
    const { addPreviousHistory } = useDocument();
    const [reports, setReports] = useState(ddts);
    const [selectAll, setSelectAll] = useState(false);

    const navigate = useNavigate();

    const reportContainerRef = useRef();
    
    const onGenerateBulkReport = () =>{
        const data = {
            reports: reportPayload.payload().list(),
        }
        if(!data.reports.length) return toast.warning('Generating Blulk Report', 'No report selected.');
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
        $(reportContainerRef.current).find('input[type=checkbox]').each((i, child)=>{
            child.checked = selectAll;
            const container = $(child).parent().parent().parent().find('[data-report-row-container]');
            const reportId = container.find('input[name=reportId]').val();
            if(child.checked) reportPayload.removeExcluded(reportId);
            else reportPayload.addExcluded(reportId);
        });
    }, [selectAll]);
    
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

const Generate = ({onGenerate}) =>{
    const { addPreviousHistory } = useDocument();
    const [isActive, setIsActive] = useState(true);

    const navigate = useNavigate();

    const overlayRef = useRef();
    const fromRef = useRef();
    const toRef = useRef();
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

    const onTriggerGenerate = () =>{
        if(!fromRef.current.valueAsDate) return $(errorRef.current).show('fast').text('Invalid date (from)');
        if(!toRef.current.valueAsDate) return $(errorRef.current).show('fast').text('Invalid date (to)');
        const from = new DateHelper().sqlStringToInput(new DateHelper(fromRef.current.valueAsDate).toSqlString());
        const to = new DateHelper().sqlStringToInput(new DateHelper(toRef.current.valueAsDate).toSqlString());
        $('[data-report-row-container]').find('[data-report-period]').each((i, row)=>{
            $(row).find('input[name=from]').val(from);
            $(row).find('input[name=to]').val(to);
        });
        $(overlayRef.current).hide('fast');
        onGenerate?.();
    }

    return(
        <div className="d-flex align-items-center">
            <button onClick={()=>toggleCollapsAll(!isActive)} className="btn btn-sm btn-outline-primary px-2 py-1 me-2">{isActive? 'Expand': 'Collaps'} All <BsArrowsCollapse/></button>   
            <button onClick={()=>$(overlayRef.current).show('fast')} className="btn btn-sm btn-outline-success px-2 py-1 me-2">Clone Reports <BiSolidReport/></button>      
            <button onClick={onSeeInvoices} className="btn btn-sm btn-outline-warning px-2 py-1">Invoices <FaFileInvoiceDollar/></button>
            
            <div ref={overlayRef} onClick={()=>$(overlayRef.current).hide('fast')} className="backdrop position-absolute top-0 start-0 vw-100 vh-100" style={{display: 'none'}}>
                <div onClick={(e)=>e.stopPropagation()} className="position-absolute top-50 start-50 translate-middle text-end bg-light py-4 px-5 rounded-3 shadow-sm">
                    <div className="allowance-row bg-transparent py-3" style={{width: '400px'}}>
                        <div className="text-start fw-bold text-wrap mb-3">What period do you want to create your records from for the cloning of employee records</div>
                        <div ref={errorRef} className="alert alert-danger text-start" style={{display: 'none'}}></div>
                        <div className="d-flex align-items-center" data-report-period="">
                            <div className="input-group w-100">
                                <span className="input-group-text">From</span>
                                <input ref={fromRef} onChange={()=>$(errorRef.current).hide('fast')} className="form-control shadow-none" name="from" type="date" />
                            </div>
                            <div className="input-group w-100 ms-3">
                                <span className="input-group-text">To</span>
                                <input ref={toRef} onChange={()=>$(errorRef.current).hide('fast')} className="form-control shadow-none" name="to" type="date" />
                            </div>
                        </div>
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
                <div className="position-absolute text-danger fs-5 end-0" style={{top: '-8px', zIndex: '8888'}}>
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


