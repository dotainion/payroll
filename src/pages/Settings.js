import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { TbPercentage } from "react-icons/tb";
import { GrDocumentStore } from "react-icons/gr";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { FaCalendarDays } from 'react-icons/fa6';
import { DateHelper } from "../utils/DateHelper";

export const Settings = () =>{
    const [days, setDays] = useState([]);
    const [allowances, setAllowances] = useState([]);
    const [deductions, setDeductions] = useState([]);
    const [isAllowanceOpen, setIsAllowanceOpen] = useState(false);
    const [isDeductionOpen, setIsDeductionOpen] = useState(false);
    const [availableAllowances, setAvailableAllowances] = useState([]);
    const [availableDeductions, setAvailableDeductions] = useState([]);

    const timeoutRef = useRef();
    const stopCallbackRef = useRef(true);
    const idRef = useRef();
    const includeSalaryRef = useRef();
    const percentageOfSalaryRef = useRef();
    const editableRef = useRef();
    const daysRef = useRef();

    const onSaveSickLeave = () =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if(days.length >= 7){
                return toast.error('Week days', 'Must include at lease one week day.');
            }
            const data = {
                id: idRef.current,
                days: daysRef.current.value,
                editable: editableRef.current.checked,
                excludedDays: days,
                includeSalary: includeSalaryRef.current.checked, 
                percentageOfSalary: percentageOfSalaryRef.current.value, 
                includeAllowances: availableAllowances, 
                includeDeductions: availableDeductions
            }
            console.log(data);
            api.settings.setSickLeaveSettings(data).then((response)=>{
                idRef.current = response.data.data[0].id;
            }).catch((error)=>{
                toast.error('Sick Leave Settings', error);
            });
        }, 300);
    }

    const setSettings = (setting) =>{
        if(!setting) return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            console.log(setting?.attributes);
            daysRef.current.value = setting?.attributes?.days;
            editableRef.current.checked = setting?.attributes?.editable;
            includeSalaryRef.current.checked = setting?.attributes?.includeSalary;
            percentageOfSalaryRef.current.value = setting?.attributes?.percentageOfSalary || '';
            setAvailableAllowances(setting?.attributes?.includeAllowances);
            setAvailableDeductions(setting?.attributes?.includeDeductions);
            setDays(setting?.attributes?.excludedDays);
        }, 100);
    }

    useEffect(()=>{
        if(!stopCallbackRef.current){ 
            onSaveSickLeave();
        }
        stopCallbackRef.current = false;
    }, [days, availableAllowances, availableDeductions]);

    useEffect(()=>{
        api.allowance.list().then((response)=>{
            setAllowances(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });

        api.deduction.list().then((response)=>{
            setDeductions(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });

        api.settings.fetchSickLeaveSettings().then((response)=>{
            stopCallbackRef.current = true;
            setSettings(response.data.data[0]);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return(
        <div className="w-100 h-100 bg-white">
            <div className="page profile text-nowrap">
                <div className="border-bottom p-2 fw-bold bg-primary text-white mt-2">Settings</div>
                <ul className="list-group mt-4">
                    <li className="list-group-item bg-light">
                        <div className="fw-bold">Sick leave settings</div>
                    </li>
                    <li className="small list-group-item">
                        <label className="d-flex align-items-center pointer">
                            <input onChange={onSaveSickLeave} ref={includeSalaryRef} className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                            <div className="p-2">Include employee salary</div>
                        </label>
                    </li>
                    <li className="small list-group-item">
                        <label className="d-flex align-items-center pointer">
                            <input onChange={onSaveSickLeave} ref={editableRef} className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                            <div className="p-2">Editable</div>
                        </label>
                        <div className="small text-muted">Making sick lave editable will allow a user to select a time rage and cost.</div>
                        <div className="small text-muted">If editable is off then sick leave will be locked into the settings provided.</div>
                    </li>
                    <li className="small list-group-item">
                        <div className="bg-light p-2 mb-2">Percentage of salary</div>
                        <div className="input-group" style={{width: '200px'}}>
                            <input onChange={onSaveSickLeave} ref={percentageOfSalaryRef} className="form-control shadow-none" placeholder="0.00" type="number"/>
                            <span className="input-group-text"><TbPercentage/></span>
                        </div>
                    </li>
                    <li className="small list-group-item">
                        <div className="bg-light p-2 mb-2">Sick leave days amount</div>
                        <div className="input-group" style={{width: '200px'}}>
                            <span className="input-group-text"><FaCalendarDays/></span>
                            <input onChange={onSaveSickLeave} ref={daysRef} className="form-control shadow-none" placeholder="0" type="number"/>
                            <span className="input-group-text">days</span>
                        </div>
                    </li>
                    <li className="small list-group-item">
                        <div className="bg-light p-2 mb-2">
                            <div>Exclude days</div>
                            <div className="text-muted">Days like week end or day can be skipped.</div>
                        </div>
                        <DaysPicker onSelected={setDays} preSelected={days} />
                    </li>
                    <li className="small list-group-item">
                        <div className="bg-light p-2 mb-2">Add allowances that will automatically be added under sick leave</div>
                        <button onClick={()=>setIsAllowanceOpen(true)} className="btn btn-sm btn-outline-primary">Add Allowances</button>
                    </li>
                    <li className="small list-group-item">
                        <div className="bg-light p-2 mb-2">Add deductions that will automatically be added under sick leave</div>
                        <button onClick={()=>setIsDeductionOpen(true)} className="btn btn-sm btn-outline-primary">Add Deductions</button>
                    </li>
                </ul>
                <hr></hr>
                <Overlay 
                    title="Allowances"
                    list={allowances} 
                    isOpen={isAllowanceOpen} 
                    selected={availableAllowances}
                    onClose={()=>setIsAllowanceOpen(false)} 
                    onSelection={(allows)=>{
                        stopCallbackRef.current = false;
                        setAvailableAllowances(allows);
                    }}
                />
                <Overlay 
                    title="Deductions"
                    list={deductions} 
                    isOpen={isDeductionOpen} 
                    selected={availableDeductions}
                    onClose={()=>setIsDeductionOpen(false)} 
                    onSelection={(deducts)=>{
                        stopCallbackRef.current = false;
                        setAvailableDeductions(deducts);
                    }}
                />
            </div>
        </div>
    )
}

const Overlay = ({isOpen, onClose, title, list, selected, onSelection}) =>{
    const overlayRef = useRef();

    const onSelected = () =>{
        let children = [];
        $(overlayRef.current).find(':checkbox:checked').each((i, child)=>{
            children.push($(child).parent().find('input[hidden]').val());
        });
        onSelection?.(children);
    }

    useEffect(()=>{
        if(!selected.length) return;
        $(overlayRef.current).find(':checkbox').each((i, child)=>{
            const id = $(child).parent().find('input[hidden]').val();
            if(selected.find((i)=>i === id)) return child.checked = true;
            child.checked = false;
        });
    }, [selected]);

    useEffect(()=>{
        if(isOpen) $(overlayRef.current).show('fast');
        else $(overlayRef.current).hide('fast');
    }, [isOpen]);

    return(
        <div ref={overlayRef} onClick={onClose} className="modal backdrop" style={{display: 'none'}}>
            <div className="modal-dialog">
                <div onClick={(e)=>e.stopPropagation()} className="modal-content">
                    <div className="modal-header bg-primary text-light">
                        <h5 className="modal-title">{title}</h5>
                        <div className="position-absolute end-0 me-2">
                            <button onClick={onClose} className="btn btn-primary">
                                <span>&times;</span>
                            </button>
                        </div>
                    </div>
                    {
                        list?.length?
                        list?.map((item, key)=>(
                            <label className="d-flex align-items-center list-item border-bottom border-light" key={key}>
                                <input onChange={onSelected} className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                                <div>{item?.attributes?.name}</div>
                                <input onChange={()=>{}} hidden value={item?.id}/>
                            </label>
                        )):
                        <div className="text-center p-5">
                            <div className="fw-bold p-2">No records</div>
                            <GrDocumentStore className="display-3"/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const DaysPicker = ({onSelected, preSelected}) =>{
    const weekRef = useRef();

    const onSelect = (e) =>{
        if($(e.currentTarget).attr('data-state') === 'active'){
            $(e.currentTarget).removeAttr('data-state').removeClass('bg-primary text-white');
        }else{
            $(e.currentTarget).attr('data-state', 'active').addClass('bg-primary text-white');
        }
        let days = [];
        $(e.currentTarget).parent().find('[data-state=active]').map((i, child)=>{
            days.push($(child).text());
        });
        if(days.length >= 7){
            toast.error('Week days', 'Must include at lease one week day.');
            $(weekRef.current).children().addClass('border border-danger');
        }else{
            $(weekRef.current).children().removeClass('border border-danger');
        }
        onSelected?.(days);
    }

    useEffect(()=>{
        if(!preSelected?.length) return;
        preSelected.forEach((day) => {
            const weekDay = $(weekRef.current).find(`[data-day=${day}]`);
            weekDay.attr('data-state', 'active').addClass('bg-primary text-white');
        });
    }, [preSelected]);

    return(
        <div ref={weekRef} className="input-group user-select-none">
            {new DateHelper().weekDays().map((day, key)=>(
                <span onClick={onSelect} className="input-group-text pointer" data-day={day} key={key}>{day}</span>
            ))}
        </div>
    )
}