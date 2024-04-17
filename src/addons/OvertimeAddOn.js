import { useEffect, useRef, useState } from "react";
import { IoClose} from 'react-icons/io5';
import { FaDollarSign, FaRegClock } from "react-icons/fa";
import { MdOutlineStart } from "react-icons/md";
import $ from 'jquery';

export const OvertimeAddOn = ({user, data, otSettings}) =>{   
    const addOnRef = useRef();
    const rateRef = useRef();
    const timeoutRef = useRef();

    const idRef = useRef();
    const nameRef = useRef();
    const hoursRef = useRef();
    const amountRef = useRef();
    const formularRef = useRef();

    const remove = (e) =>{
        const parent = $(addOnRef.current).parent();
        $(e.currentTarget).parent().parent().remove();
        $(parent).trigger('change');
    }
    
    const onCalculate = () =>{
        if(!otSettings) return;
        const formular = otSettings.find((ot)=>ot.id === formularRef.current.value);
        if(!formular) return;
        const formularVal = parseFloat(formular.attributes.value || 0);
        const hours = parseFloat(hoursRef.current.value || 0);
        amountRef.current.value = hours * formularVal;
        $(rateRef.current).text(formularVal);
    }

    useEffect(()=>{
        if(!data || !otSettings) return;
        nameRef.current.value = data?.attributes?.name || 'Overtime';
        hoursRef.current.value = data?.attributes?.hours || 1;
        amountRef.current.value = data?.attributes?.amount;
        if(data?.attributes?.formularId){
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                const formular = otSettings.find((ot)=>ot.id === data.attributes.formularId);
                if(!formular) return;
                $(formularRef.current).find('option').each((i, option)=>{
                    if($(option).attr('value') === data.attributes.formularId) $(option).attr('selected', 'selected');
                    else $(option).removeAttr('selected');
                });
                onCalculate();
            }, 100);
        }
    }, [data, otSettings]);

    return(
        <div ref={addOnRef} onChange={onCalculate} className="w-100" data-overtime="">
            <div className="allowance-row border m-3">
                <input ref={nameRef} className="form-control shadow-none border-0" name="name" placeholder="Name of action"/>
                <div className="d-flex align-items-center mt-2">
                    <div className="input-group">
                        <span className="input-group-text"><MdOutlineStart/></span>
                        <select ref={formularRef} className="form-control shadow-none" name="formular">
                            {otSettings?.map?.((ot, key)=>(
                                <option value={ot.id} key={key}>{ot.attributes.name}</option>
                            ))}
                        </select>
                        <span className="input-group-text w-25">Formular</span>
                    </div>
                </div>
                <div className="text-end"><b className="me-1">Rate:</b><span ref={rateRef}></span></div>
                <div className="d-flex align-items-center mt-2">
                    <div className="input-group">
                        <span className="input-group-text"><FaRegClock/></span>
                        <input ref={hoursRef} className="form-control shadow-none" name="hours" placeholder="1 Hours" type="number" min={1} defaultValue={1}/>
                        <span className="input-group-text w-25">Hours</span>
                    </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <div className="input-group">
                        <span className="input-group-text"><FaDollarSign/></span>
                        <input ref={amountRef} className="form-control shadow-none border" name="amount" placeholder="0.00" type="number" readOnly/>
                    </div>
                </div>
                <span onClick={remove} className="close" title="Remove"><IoClose className="fs-4"/></span>
            </div>
            <input ref={idRef} hidden value={data?.id} name="id" onChange={()=>{}} />
            <input hidden value={data?.linkId} name="linkId" onChange={()=>{}} />
        </div>
    )
}


export const ExistingOvertimeAddOn = ({user, data, otSettings}) =>{
    useEffect(()=>{
        
    }, []);
    return(
        <OvertimeAddOn data={data} otSettings={otSettings} user={user}/>
    )
}