import React, { useState } from "react";
import { CiSearch } from 'react-icons/ci';
import $ from 'jquery';
import { useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useEffect } from "react";
import { LiaEdit } from 'react-icons/lia';
import { BiSolidShareAlt, BiSolidReport, BiSolidPrinter, BiImport, BiExport } from 'react-icons/bi';
import { GoWorkflow } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { FaCalendarDays } from 'react-icons/fa6';
import { api } from "../request/Api";
import { BsDashLg } from "react-icons/bs";

export const Searchbar = ({onTyping, onFilter, onDateSearch, beginChildren}) =>{
    const [periods, setPeriods] = useState([]);
    const [departments, setDepartments] = useState([]);

    const containerRef = useRef();
    const filterOverlayRef = useRef();
    const moreOverlayRef = useRef();
    const inputRef = useRef();
    const searchBtnRef = useRef();
    const timeoutRef = useRef();
    const searchByDateOverlayRef = useRef();
    const fromRef = useRef();
    const toRef = useRef();

    const onOpenSearch = (e) =>{
        e.stopPropagation();
        if($(containerRef.current).is(':hidden')){
            $(searchBtnRef.current).find('span').empty();
            $(searchBtnRef.current).addClass('bg-lightgray').removeClass('border-white');
            return $(containerRef.current).show('fast');
        }
    }

    const onSearchByDate = () =>{
        $(fromRef.current).removeClass('border border-danger');
        $(toRef.current).removeClass('border border-danger');
        if(!fromRef.current.valueAsDate) return;
        if(!toRef.current.valueAsDate) return;
        if(toRef.current.valueAsDate <= fromRef.current.valueAsDate){
            $(fromRef.current).addClass('border border-danger');
            return $(toRef.current).addClass('border border-danger');
        }
        $(searchByDateOverlayRef.current).hide('fast');
        onDateSearch?.({
            from: fromRef.current.valueAsDate,
            to: toRef.current.valueAsDate
        });
    }

    const onPeriodSelect = (period) =>{
        fromRef.current.value = period?.attributes?.from?.split(' ')?.[0];
        toRef.current.value = period?.attributes?.to?.split(' ')?.[0];
        onSearchByDate();
    }

    const onTriggerTyping = (e) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            onTyping?.(e);
        }, 100);
    }

    const onTriggerFilter = (e, dept) =>{
        e.stopPropagation();
        $(filterOverlayRef.current).hide('fast');
        onFilter?.(dept?.attributes?.name);
    }

    const onShowFilter = () =>{
        closeOverlays();
        $(filterOverlayRef.current).show('fast');
    }

    const onShowSerchByDate = () =>{
        closeOverlays();
        $(searchByDateOverlayRef.current).show('fast');
    }

    const onShowMore = (e) =>{
        e.stopPropagation();
        closeOverlays();
        $(moreOverlayRef.current).show('fast');
    }

    const closeOverlays = () =>{
        $('[data-overlay]').hide('fast');
    }

    const onClose = () =>{
        $('[data-overlay]').hide('fast');
        $(containerRef.current).hide('fast');
        $(moreOverlayRef.current).hide('fast');
        $(filterOverlayRef.current).hide('fast');
        $(searchByDateOverlayRef.current).hide('fast');
        $(searchBtnRef.current).find('span').text('Search');
        $(searchBtnRef.current).removeClass('bg-lightgray').addClass('border-white');
    }

    useEffect(()=>{
        $(window).click(()=>onClose());
        
        api.department.list().then((response)=>{
            setDepartments(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });

        api.report.listPeriods().then((response)=>{
            setPeriods(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return(
        <div className="searchbar">
            <div className="d-flex align-items-center w-100">
                <div className="w-100 px-3">
                    {beginChildren}
                </div>
                <div onClick={(e)=>e.stopPropagation()} ref={containerRef} style={{display: 'none'}}>
                    <div className="d-flex align-items-center">
                        {onDateSearch && <button onClick={onShowSerchByDate} className="d-flex position-relative align-items-center border-end-0">
                            <FaCalendarDays className="m-1"/>
                            <div ref={searchByDateOverlayRef} className="top-0 mt-5 pt-4 arrow-up position-absolute bg-white shadow text-nowrap text-start rounded-3" data-overlay="" style={{display: 'none', zIndex: '9999999999999999'}} onClick={(e)=>e.stopPropagation()}>
                                <div className="d-flex align-items-center px-3 pb-1">
                                    <div>
                                        <small>From</small>
                                        <input ref={fromRef} onChange={onSearchByDate} className="form-control shadow-none me-1" type="date" onClick={(e)=>$(e.target).focus()} />
                                    </div>
                                    <div>
                                        <small className="ms-1">To</small>
                                        <input ref={toRef} onChange={onSearchByDate} className="form-control shadow-none ms-1" type="date" onClick={(e)=>$(e.target).focus()} />
                                    </div>
                                </div>
                                <div>
                                    {periods.map((period, key)=>(
                                        <div onClick={()=>onPeriodSelect(period)} className="d-flex align-items-center list-item px-3 py-1" key={key}>
                                            <div className="w-50 text-end">{period?.attributes?.from?.split(' ')?.[0]}</div>
                                            <div className="mx-3"><BsDashLg/></div>
                                            <div className="w-50 text-start">{period?.attributes?.to?.split(' ')?.[0]}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </button>}
                        <button onClick={onShowFilter} className="d-flex position-relative align-items-center border-end-0" type="button">
                            <span>Filter by department</span>
                            <RiArrowDownSLine className="ms-1"/>
                            <div ref={filterOverlayRef} className="top-0 mt-5 pt-4 arrow-up position-absolute bg-white shadow text-nowrap text-start rounded-3" data-overlay="" style={{display: 'none', zIndex: '9999999999999999'}}>
                                <div onClick={(e)=>onTriggerFilter(e, {attributes: {name: ''}})} className="px-3 pb-1 border-bottom">Departments <span className="text-primary">*</span></div>
                                {departments.map((dept, key)=>(
                                    <div onClick={(e)=>onTriggerFilter(e, dept)} className="list-item" key={key}>{dept?.attributes?.name}</div>
                                ))}
                            </div>
                        </button>
                        <input ref={inputRef} onKeyUp={onTriggerTyping} type="text" className="border-start-0" placeholder="Search"/>
                    </div>
                </div>
                <button ref={searchBtnRef} onClick={onOpenSearch} className="d-flex align-items-center border-white" id="basic-addon2">
                    <div className="d-flex align-items-center">
                        <CiSearch className="me-1 fs-4"/>
                        <span>Search</span>
                    </div>
                </button>
                <div className="d-none" hidden style={{display: 'none'}}>
                <button onClick={onShowMore} className="position-relative mx-3 px-2 d-flex align-items-center border-0 border-start" id="basic-addon2">
                    <span>More</span>
                    <RiArrowDownSLine className="ms-1"/>
                    <div ref={moreOverlayRef} className="top-0 mt-5 pt-4 p-3 arrow-up position-absolute end-0 bg-white shadow text-nowrap text-start rounded-3" data-overlay="" style={{display: 'none', zIndex: '9999999999999999'}}>
                        <div className="list-item d-flex align-items-center">
                            <LiaEdit className="me-2"/>
                            <span>Bulk Edit</span>
                        </div>
                        <div className="list-item d-flex align-items-center">
                            <BiSolidShareAlt className="me-2"/>
                            <span>Bulk Share</span>
                        </div>
                        <hr/>
                        <div className="list-item d-flex align-items-center">
                            <GoWorkflow className="me-2"/>
                            <span>Workflows</span>
                        </div>
                        <div className="list-item d-flex align-items-center">
                            <BiSolidReport className="me-2"/>
                            <span>Reporting</span>
                        </div>
                        <div className="list-item d-flex align-items-center">
                            <BiSolidPrinter className="me-2"/>
                            <span>Print</span>
                        </div>
                        <hr/>
                        <div className="list-item d-flex align-items-center">
                            <BiImport className="me-2"/>
                            <span>Import</span>
                        </div>
                        <div className="list-item d-flex align-items-center">
                            <BiExport className="me-2"/>
                            <span>Export</span>
                        </div>
                        <hr/>
                        <div className="list-item d-flex align-items-center">
                            <MdDelete className="me-2"/>
                            <span>Bulk Delete</span>
                        </div>
                    </div>
                </button>
                </div>
            </div>
        </div>
    )
}