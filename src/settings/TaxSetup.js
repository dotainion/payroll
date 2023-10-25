import React, { useRef, useEffect } from "react";
import $ from 'jquery';
import { TbPercentage } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { v4 as uuidv4 } from 'uuid';

export const TaxSetup = ({data}) =>{
    const taxPageRef = useRef();
    const onOffRef = useRef();
    const timeoutRef = useRef();
    
    const idRef = useRef();
    const activeRef = useRef();
    const percentageRef = useRef();
    const limitAmountRef = useRef();
    const notifyRef = useRef();
    const autoRef = useRef();
    const notifyAndAutoRef = useRef();

    const onUpdate = () =>{
        const data = {
            id: idRef.current, 
            active: activeRef.current.checked, 
            percentage: percentageRef.current.value, 
            limitAmount: limitAmountRef.current.value, 
            notify: notifyRef.current.checked, 
            auto: autoRef.current.checked, 
            notifyAndAuto: notifyAndAutoRef.current.checked
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.tax.set(data).then((response)=>{
                idRef.current = response.data.data[0].id;
            }).catch((error)=>{
                toast.warning('Tax Settings', error);
                activeRef.current.checked = false;
                onTurnOn({target: activeRef.current});
            });
        }, 500);
    }

    const onDelete = () =>{
        if(!idRef.current) return removeThisTaxSetting();
        api.tax.delete(idRef.current).then((response)=>{
            removeThisTaxSetting();
        }).catch((error)=>{
            removeThisTaxSetting();
        });
    }

    const removeThisTaxSetting = () =>{
        $(taxPageRef.current).hide('slow').promise().then(()=>{
            $(taxPageRef.current).remove();
        });
    }

    const onTurnOn = (e) =>{
        if(e.target.checked) return $(onOffRef.current).text('On');
        $(onOffRef.current).text('Off');
    }

    useEffect(()=>{
        $(taxPageRef.current).show('slow');
        if(!data) return idRef.current = uuidv4();
        idRef.current = data?.id;
        activeRef.current.checked = data?.attributes?.active;
        percentageRef.current.value = data?.attributes?.percentage;
        limitAmountRef.current.value = data?.attributes?.limitAmount;
        notifyRef.current.checked = data?.attributes?.notify;
        autoRef.current.checked = data?.attributes?.auto;
        notifyAndAutoRef.current.checked = data?.attributes?.notifyAndAuto;
        onTurnOn({target: activeRef.current});
    }, [data]);

    return(
        <div ref={taxPageRef} onChange={onUpdate} style={{display: 'none'}}>
            <ul className="list-group mt-3">
                <li className="small list-group-item bg-light d-flex w-100">
                    <label className="d-flex align-items-center pointer w-100">
                        <input ref={activeRef} onChange={onTurnOn} className="form-check-input bg-info bg-lightgray me-2" type="checkbox"/>
                        <div ref={onOffRef}>Off</div>
                    </label>
                    <button onClick={onDelete} className="btn btn-outline-danger btn-sm">Delete</button>
                </li>
                <li className="small list-group-item">
                    <div className="bg-light p-2 mb-2">Percentage of tax deduction</div>
                    <div className="input-group" style={{width: '200px'}}>
                        <input ref={percentageRef} className="form-control shadow-none" placeholder="0.00" type="number"/>
                        <span className="input-group-text"><TbPercentage/></span>
                    </div>
                </li>
                <li className="small list-group-item">
                    <div className="bg-light p-2">Salary limit</div>
                    <div className="small text-muted mb-2">This is the limit that will trigger the tax deduction event.</div>
                    <div className="input-group" style={{width: '200px'}}>
                        <span className="input-group-text"><BsCurrencyDollar/></span>
                        <input ref={limitAmountRef} className="form-control shadow-none" placeholder="0.00" type="number"/>
                    </div>
                </li>
                <li className="small list-group-item">
                    <label className="d-flex align-items-center pointer p-0">
                        <input ref={notifyRef} className="form-check-input bg-info bg-lightgray p-2 me-2" name="notify" type="radio"/>
                        <div className="p-2">Notify when tax deduction is required</div>
                    </label>
                    <label className="d-flex align-items-center pointer p-0">
                        <input ref={autoRef} className="form-check-input bg-info bg-lightgray p-2 me-2" name="notify" type="radio"/>
                        <div className="p-2">Automatically add tax deduction</div>
                    </label>
                    <label className="d-flex align-items-center pointer p-0">
                        <input ref={notifyAndAutoRef} className="form-check-input bg-info bg-lightgray p-2 me-2" name="notify" type="radio"/>
                        <div className="p-2">Notify and automatically add tax deduction</div>
                    </label>
                </li>
            </ul>
        </div>
    )
}
