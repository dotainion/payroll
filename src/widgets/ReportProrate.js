import React, { useEffect, useRef, useState } from "react";
import { BiCalendar } from "../components/BiCalendar";
import $ from 'jquery';
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { IoCalendar } from "react-icons/io5";

export const ReportProrate = ({existingProrate}) =>{
    const [prorate, setProrate] = useState();
    const [display, setDisplay] = useState();
    const [showExisting, setShowExisting] = useState(false);


    const overlayRef = useRef();
    const pickerRef = useRef();

    const onShowOverlay = (e) =>{
        e.stopPropagation();
        let offset = 0;
        if(window.innerWidth < 860)  offset = 200;
        const positon = e.target.getBoundingClientRect();
        $(overlayRef.current).css({
            top: positon.y + ($(e.target).height() / 2),
            left: (positon.x - $(overlayRef.current).width()) + ($(e.target).width() / 2) + offset
        }).show('fast');
    }

    const onHideOverlay = () =>{
        $(overlayRef.current).hide('fast');
    }

    const onClear = () =>{
        setShowExisting(false);
        setDisplay(null);
        $(overlayRef.current).find('[name=prorateFrom]').val('');
        $(overlayRef.current).find('[name=prorateTo]').val('');
        pickerRef.current.clearSelection();
    }

    const setupPicker = (picker) =>{
        pickerRef.current = picker;
    }

    const onDisplayProrate = (start, end) =>{
        setDisplay({
            from: start.dateInstance.toDateString(), 
            to: end.dateInstance.toDateString()
        });
        setShowExisting(true);
    }

    useEffect(()=>{
        if(!existingProrate) return;
        setProrate({
            from: existingProrate.attributes.from, 
            to: existingProrate.attributes.to
        });
        setShowExisting(true);
    }, [existingProrate]);

    useEffect(()=>{
        $(document).on('click', () =>{
            onHideOverlay();
        });
        return () => $(document).off('click');
    }, []);

    return(
        <>
            {showExisting ? null :<div className="d-inline-block w-auto">
                <div className="allowance-row bg-transparent py-3 d-flex align-items-center w-auto">
                    <button onClick={onShowOverlay} className="d-flex align-items-center btn btn-sm btn-primary px-3"><IoCalendar className="me-2" /> Prorate</button>
                </div>
            </div>}
            
            <div ref={overlayRef} className="position-absolute report-prorate-overlay shadow rounded-3 bg-white border overflow-hidden" onClick={e=>e.stopPropagation()}>
                <div className="text-center">
                    <div className="bg-primary text-start text-light h5 fw-bold border-bottom py-2 px-3">Prorate</div>
                    <div className="p-3 pt-2" data-report-prorate="">
                        <div className="text-secondary mb-3">The prorated salary is calculated by dividing the salary by the number of workdays in a pay period and multiplying it by the number of workdays the employee will be working during that period.</div>
                        <BiCalendar period={prorate} onSelect={onDisplayProrate} onSetup={setupPicker} inlineMode biMonthlyOff fireOnLoad nameFrom="prorateFrom" nameTo="prorateTo" />
                        <div className="text-end">
                            <button onClick={onHideOverlay} className="btn btn-sm btn-primary py-0 me-2">Close</button>
                            <button onClick={onClear} className="btn btn-sm btn-primary py-0">Clear</button>
                        </div>
                    </div>
                </div>
            </div>

            {showExisting ? <div className="px-3 bg-lightergray py-3">
                <div className="fw-bold">Prorate</div>
                <div className="text-muted mb-2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate</div>
                <div className="d-inline-block rounded-1 text-light bg-primary py-2 px-3">
                    <div className="d-flex align-items-center">
                        <BsFillCalendar2DateFill className="fs-1" />
                        <div className="ms-3 text-nowrap">
                            <div className="d-flex fw-bold">
                                <div>Days worked</div>
                                <div className="w-100 text-end">
                                    <button onClick={onShowOverlay} className="btn btn-sm btn-primary py-0"><RiEdit2Fill /> Edit</button>
                                </div>
                            </div>
                            <div className="d-flex small">
                                <div>From <b>{display?.from}</b></div>
                                <div className="ms-2">To <b>{display?.to}</b></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
        </>
    )
}