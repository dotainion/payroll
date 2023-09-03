import { useEffect, useRef } from "react";
import { IoClose} from 'react-icons/io5';
import { useDocument } from "../contents/DocumentProvider";
import { CostTypeAndRateHandler } from "../utils/CostTypeAndRateHandler";
import $ from 'jquery';
import { FaDollarSign, FaRegClock } from "react-icons/fa";
import { MdOutlineStart } from "react-icons/md";

export const OvertimeAddOn = ({onRemove, user, data}) =>{
    const { costTypes, rateTypes } = useDocument();
    
    const idRef = useRef();

    const timeoutRef = useRef();
    const addOnRef = useRef();

    const rateRef = useRef();
    const hoursRef = useRef();
    const amountRef = useRef();

    const remove = (e) =>{
        if(data){
            const currentTarget = e.currentTarget;
            onRemove?.(()=>$(currentTarget).parent().parent().remove(), $(idRef.current).val());
        }else{
            $(e.currentTarget).parent().parent().remove();
        }
    }
    

    useEffect(()=>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
           
        }, 100);
    }, [data]);

    return(
        <div ref={addOnRef} className="w-100" data-overtime="">
            <div className="allowance-row border m-3">
                <input className="form-control shadow-none border-0" name="name" defaultValue={data?.attributes?.name || 'Over Time'} placeholder="Name of action"/>
                <div className="d-flex align-items-center mt-2">
                    <div className="input-group">
                        <span className="input-group-text"><MdOutlineStart/></span>
                        <input ref={rateRef} className="form-control shadow-none" name="rate" defaultValue={data?.attributes?.amount} placeholder="1.5" type="number"/>
                        <span className="input-group-text w-25">Rate</span>
                    </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <div className="input-group">
                        <span className="input-group-text"><FaRegClock/></span>
                        <input ref={hoursRef} className="form-control shadow-none" name="hours" defaultValue={data?.attributes?.amount || 1} placeholder="1 Hours" type="number"/>
                        <span className="input-group-text w-25">Hours</span>
                    </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <div className="input-group">
                        <span className="input-group-text"><FaDollarSign/></span>
                        <input ref={amountRef} className="form-control shadow-none" name="amount" defaultValue={data?.attributes?.amount || user?.attributes?.otRate} placeholder="0.00" type="number"/>
                    </div>
                </div>
                <span onClick={remove} className="close" title="Remove"><IoClose className="fs-4"/></span>
            </div>
            <input ref={idRef} hidden value={data?.id} name="id" onChange={()=>{}} />
        </div>
    )
}


export const ExistingOvertimeAddOn = ({onRemove, user, data}) =>{
    useEffect(()=>{
        
    }, []);
    return(
        <OvertimeAddOn data={data} user={user} onRemove={onRemove}/>
    )
}