import React, { useEffect, useRef, useState } from "react";
import Litepicker from "litepicker";
import $ from 'jquery';
import { DateHelper } from "../utils/DateHelper";

export const BiCalendar = ({onSelect, period, inlineMode, biMonthlyOff, fireOnLoad, onSetup, nameFrom, nameTo}) =>{
    const containerRef = useRef();
    const triggerRef = useRef();
    const overlayRef = useRef();
    const closeBtnRef = useRef();
    const defaultRef = useRef();
    const pickerRef = useRef();
    const enableRangeRef = useRef();
    const disableRangeRef = useRef();
    const lockOverlayRef = useRef();

    const fromRef = useRef();
    const toRef = useRef();

    const close = (e) =>{
        e.stopPropagation();
        if(inlineMode) return;
        $(overlayRef.current).hide('fast');
    }

    const open = (e) =>{
        e.stopPropagation();
        if(inlineMode) return;
        let startDate = new Date();
        let endDate = new Date();

        if(fromRef.current.valueAsDate){
            startDate = fromRef.current.valueAsDate;
        }
        if(toRef.current.valueAsDate){
            endDate = toRef.current.valueAsDate;
        }
        if(startDate > endDate){
            const tempDate = startDate;
            startDate = endDate;
            endDate = tempDate;
        }
        pickerRef.current.setDateRange(startDate, endDate);
        $(overlayRef.current).show('fast');
    }

    const getDaysInMonth = (year, month) => {
        return new Date(year, month +1, 0).getDate();
    }

    const seperateBiMonthlyDaysInArray = (daysInMonth) =>{
        let toggleBiMonthly = true;
        let biMonthlyStart = [];
        let biMonthlyEnd = [];
        [...Array(daysInMonth).keys()].forEach((day)=>{
            if(toggleBiMonthly){
                biMonthlyStart.push(day +1);
                toggleBiMonthly = false;
            }else{
                biMonthlyEnd.push(day +1);
                toggleBiMonthly = true;
            }
        });
        return {start: biMonthlyStart, end: biMonthlyEnd};
    }

    const setBiMonthly = (start, end) =>{
        const uiData = getMonthFromUi();
        const startTime = new Date(uiData.year, uiData.month);
        startTime.setDate(start);
        const endTime = new Date(uiData.year, uiData.month);
        endTime.setDate(end);
        pickerRef.current.setDateRange(startTime, endTime);
    }

    const getMonthFromUi = () =>{
        const month = new DateHelper().monthIndex($(overlayRef.current).find('.month-item-name').text());
        const year = parseInt($(overlayRef.current).find('.month-item-year').text());
        return {month, year};
    }

    const onSelectDefault = (cmd) =>{
        const uiData = getMonthFromUi();
        const daysInMonth = getDaysInMonth(uiData.year, uiData.month);
        if(cmd === 'byMonthlyStart'){
            const biMonthly = seperateBiMonthlyDaysInArray(daysInMonth);
            setBiMonthly(1, biMonthly.start.length);
        }else if(cmd === 'byMonthlyEnd'){
            const biMonthly = seperateBiMonthlyDaysInArray(daysInMonth);
            setBiMonthly(biMonthly.start.length +1, biMonthly.end.length + biMonthly.start.length);
        }else if(cmd === 'monthly'){
            const biMonthly = seperateBiMonthlyDaysInArray(daysInMonth);
            setBiMonthly(1, biMonthly.end.length + biMonthly.start.length);
        }
    }

    useEffect(() => {
        pickerRef.current = new Litepicker({
            autoApply: true,
            element: containerRef.current,
            firstDay: 0,
            format: 'MMM, DD YYYY',
            mobileFriendly: true,
            numberOfColumns: 1,
            numberOfMonths: 1,
            singleMode: false,
            inlineMode: true,
            resetButton: false,
            setup: (picker) => {
                picker.on('selected', (date1, date2) => {
                    const startDate = new DateHelper(date1.dateInstance);
                    const endDate = new DateHelper(date2.dateInstance);
                    fromRef.current.value = startDate.sqlStringToInput(startDate.toSqlString());
                    toRef.current.value = endDate.sqlStringToInput(endDate.toSqlString());
                    $(fromRef.current).trigger('change');
                    $(toRef.current).trigger('change');
                    onSelect?.(date1, date2);
                });
                //clearSelection
                onSetup?.(picker);
            }
        });

        $(window).click((e)=>close(e));
        $(triggerRef.current).click((e)=>open(e));
        $(closeBtnRef.current).click((e)=>close(e));
        $(overlayRef.current).click((e)=>e.stopPropagation());
        $(defaultRef.current).children().click((e)=>{
            onSelectDefault($(e.currentTarget).attr('data-key'));
        });
        $(enableRangeRef.current).click(()=>{
            $(enableRangeRef.current).hide('fast');
            $(disableRangeRef.current).show('fast');
            $(lockOverlayRef.current).hide();
        });
        $(disableRangeRef.current).click(()=>{
            $(disableRangeRef.current).hide('fast');
            $(enableRangeRef.current).show('fast');
            $(lockOverlayRef.current).show();
        });

        return ()=>{
            $(containerRef.current).empty();
            $(document).off('click');
            $(triggerRef.current).off('click');
            $(closeBtnRef.current).off('click');
            $(overlayRef.current).off('click');
            $(defaultRef.current).children().off('click');
            $(enableRangeRef.current).off('click');
            $(disableRangeRef.current).off('click');
        }
    }, []);

    useEffect(()=>{
        if(!period) return;
        const date = new DateHelper();
        fromRef.current.value = date.sqlStringToInput(period?.from);
        toRef.current.value = date.sqlStringToInput(period?.to);

        if(fireOnLoad) onSelect?.({
            dateInstance: new Date(period?.from)
        }, {
            dateInstance: new Date(period?.to)
        });
    }, [period]);

    return(
        <>
        <div ref={triggerRef}>
            <div className="d-flex align-items-center pointer" data-report-period="">
                <div className="input-group w-100 pointer">
                    <span className="input-group-text">From</span>
                    <input ref={fromRef} className="form-control shadow-none pointer" name={nameFrom || 'from'} type="date" readOnly />
                </div>
                <div className="input-group w-100 ms-3 pointer">
                    <span className="input-group-text">To</span>
                    <input ref={toRef} className="form-control shadow-none pointer" name={nameTo || 'to'} type="date" readOnly />
                </div>
            </div>
        </div>
        <div ref={overlayRef} className={`${!inlineMode ? 'position-absolute' : ''} user-select-none`} style={{display: inlineMode ? '' : 'none', zIndex: '999999999'}}>
            <div className="d-inline-block shadow-sm border">
                <div className="d-flex">
                    {!biMonthlyOff ? <div className="d-flex align-items-center border-end bg-light">
                        <div ref={defaultRef} className="text-nowrap">
                            <div className="btn d-block border-0 rounded-0 btn-outline-primary py-1 px-3" data-key="monthly">Monthly</div>
                            <div className="btn d-block border-0 rounded-0 btn-outline-primary py-1 px-3" data-key="byMonthlyStart">Bi Monthly Start</div>
                            <div className="btn d-block border-0 rounded-0 btn-outline-primary py-1 px-3" data-key="byMonthlyEnd">Bi Monthly End</div>
                        </div>
                    </div> : null}
                    <div>
                        <div className="position-relative">
                            <div ref={containerRef} />
                           {!biMonthlyOff ? <div ref={lockOverlayRef} className="position-absolute start-0 bottom-0 w-100" style={{zIndex: '999999', height: '80%'}} /> : null}
                        </div>
                        {!biMonthlyOff ? <div className="bg-light p-2 text-end">
                            <button ref={enableRangeRef} onClick={close} className="btn btn-link py-0 ms-2">Enable range select</button>
                            <button ref={disableRangeRef} onClick={close} className="btn btn-link py-0 ms-2" style={{display: 'none'}}>Disable range select</button>
                            <button ref={closeBtnRef} onClick={close} className={`btn btn-sm btn-secondary py-0 ms-2 ${inlineMode ? 'd-none' : ''}`}>Done</button>
                        </div> : null}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}