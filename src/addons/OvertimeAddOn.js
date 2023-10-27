import { useEffect, useRef } from "react";
import { IoClose} from 'react-icons/io5';
import { FaDollarSign, FaRegClock } from "react-icons/fa";
import { MdOutlineStart } from "react-icons/md";
import $ from 'jquery';

export const OvertimeAddOn = ({user, data}) =>{    
    const idRef = useRef();

    const addOnRef = useRef();

    const nameRef = useRef();
    const rateRef = useRef();
    const hoursRef = useRef();
    const amountRef = useRef();

    const remove = (e) =>{
        $(e.currentTarget).parent().parent().remove();
    }
    

    useEffect(()=>{
        console.log(data);
        nameRef.current.value = data?.attributes?.name || 'Overtime';
        rateRef.current.value = data?.attributes?.rate || '';
        hoursRef.current.value = data?.attributes?.hours || 1;
        amountRef.current.value = data?.attributes?.amount || user?.attributes?.otRate;
    }, [data]);

    return(
        <div ref={addOnRef} className="w-100" data-overtime="">
            <div className="allowance-row border m-3">
                <input ref={nameRef} className="form-control shadow-none border-0" name="name" placeholder="Name of action"/>
                <div className="d-flex align-items-center mt-2">
                    <div className="input-group">
                        <span className="input-group-text"><MdOutlineStart/></span>
                        <input ref={rateRef} className="form-control shadow-none" name="rate" placeholder="1.5" type="number"/>
                        <span className="input-group-text w-25">Rate</span>
                    </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <div className="input-group">
                        <span className="input-group-text"><FaRegClock/></span>
                        <input ref={hoursRef} className="form-control shadow-none" name="hours" placeholder="1 Hours" type="number"/>
                        <span className="input-group-text w-25">Hours</span>
                    </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <div className="input-group">
                        <span className="input-group-text"><FaDollarSign/></span>
                        <input ref={amountRef} className="form-control shadow-none" name="amount" placeholder="0.00" type="number"/>
                    </div>
                </div>
                <span onClick={remove} className="close" title="Remove"><IoClose className="fs-4"/></span>
            </div>
            <input ref={idRef} hidden value={data?.id} name="id" onChange={()=>{}} />
            <input hidden value={data?.linkId} name="linkId" onChange={()=>{}} />
        </div>
    )
}


export const ExistingOvertimeAddOn = ({user, data}) =>{
    useEffect(()=>{
        
    }, []);
    return(
        <OvertimeAddOn data={data} user={user}/>
    )
}