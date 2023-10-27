import { useEffect, useRef } from "react";
import { IoClose} from 'react-icons/io5';
import { useDocument } from "../contents/DocumentProvider";
import { CostTypeAndRateHandler } from "../utils/CostTypeAndRateHandler";
import $ from 'jquery';
import { DateHelper } from "../utils/DateHelper";
import { BsCalendar2Date, BsCalendar2DateFill } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { BiSolidFilePdf } from "react-icons/bi";

export const SickLeaveAddOn = ({onSickLeaveAmount, data, user, setting}) =>{
    const idRef = useRef();
    const fileRef = useRef();
    const dropRef = useRef();
    const fromRef = useRef();
    const toRef = useRef();
    const amountRef = useRef();
    const nameRef = useRef();

    const excludedDaysHandler = (sett) =>{
        const days = parseInt(sett?.attributes?.days || 0);
        const excludedDays = sett?.attributes?.excludedDays;
        const week = new DateHelper().weekDays();
        const date = new Date(fromRef.current.valueAsDate);
        [...Array(days || 0).keys()].forEach(()=>{
            for(let i=0; i<7; i++){
                if(excludedDays.includes(week[date.getDay()])) date.setDate(date.getDate() +1);
                else break;
            }
            date.setDate(date.getDate() +1);
        });
        return date;
    }

    const remove = (e) =>{
        $(e.currentTarget).parent().remove()
    }

    useEffect(()=>{
        if(!data) return;
        const date = new DateHelper();
        idRef.current.value = data?.id;
        nameRef.current.value = data?.attributes?.name;
        amountRef.current.value = data?.attributes?.amount;
        fromRef.current.value = date.sqlStringToInput(data?.attributes?.from);
        toRef.current.value = date.sqlStringToInput(data?.attributes?.to);
    }, [data]);

    useEffect(()=>{
        const salary = user?.attributes?.salary;
        const percentage = parseFloat(setting?.attributes?.percentageOfSalary);
        const reportSalary = ((parseFloat(salary) / 100) * percentage);
        amountRef.current.value = reportSalary || 0;
        onSickLeaveAmount?.(reportSalary);
    }, [user, setting]);

    useEffect(()=>{
        $(fromRef.current).on('change', (e)=>{
            const date = new DateHelper(excludedDaysHandler(setting));
            toRef.current.value = date.sqlStringToInput(date.toSqlString());
        });
    }, []);

    return(
        <div className="allowance-row border m-3" data-sick-leave-addon="">
            <input ref={nameRef} className="form-control shadow-none" name="name" placeholder="Sick leave" defaultValue={'Sick Leave'} />
            <div className="d-flex align-items-center">
                <div className="me-2 w-100">
                    <div className="small">From</div>
                    <div className="input-group">
                        <span className="input-group-text"><BsCalendar2Date/></span>
                        <input ref={fromRef} className="form-control shadow-none" type="date" name="from" />
                    </div>
                </div>
                <div className="w-100">
                    <div className="small">to</div>
                    <div className="input-group position-relative">
                        <span className={`input-group-text ${setting?.attributes?.editable?'':'border-light'}`}><BsCalendar2DateFill/></span>
                        <input ref={toRef} className={`form-control shadow-none ${setting?.attributes?.editable?'':'user-select-none bg-inherit border-light'}`} type="date" name="to" readOnly={!setting?.attributes?.editable} />
                        {!setting?.attributes?.editable && <div className="position-absolute start-0 top-0 w-100 h-100 bg-transparent"></div>}
                    </div>
                </div>
            </div>
            <div className="input-group mt-3">
                <span className="input-group-text"><FaDollarSign/></span>
                <input ref={amountRef} className="form-control shadow-none" name="amount" placeholder="0.00" readOnly={!setting?.attributes?.editable} type="number"/>
            </div>
            <div 
                ref={dropRef} 
                onClick={()=>$(fileRef.current).trigger('click')} 
                onDragOver={(e)=>$(e.currentTarget).addClass('dropzone-dashed')} 
                onDragLeave={(e)=>$(e.currentTarget).removeClass('dropzone-dashed')}
                className="dropzone rounded-3 d-flex align-items-center justify-content-center bg-light mt-2 p-2"
            >
                <div className="me-1"><span className="fw-bold">Attach PDF</span> or drag it here</div>
                <BiSolidFilePdf className="ms-1 fs-3"/>
                <input ref={fileRef} accept="application/pdf" type="file" hidden />
            </div>
            <input ref={idRef} hidden name="id" onChange={()=>{}} />
            <input hidden value={data?.linkId} name="linkId" onChange={()=>{}} />
            <span onClick={remove} className="close" title="Remove"><IoClose className="fs-4"/></span>
        </div>
    )
}


export const ExistingSickLeaveAddOn = ({onSickLeaveAmount, data, user, setting}) =>{
    useEffect(()=>{
        
    }, []);
    return(
        <SickLeaveAddOn 
            data={data} 
            setting={setting} 
            user={user} 
            onSickLeaveAmount={onSickLeaveAmount}
        />
    )
}