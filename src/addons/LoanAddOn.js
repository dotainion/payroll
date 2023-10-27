import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PiBankFill } from "react-icons/pi";
import $ from 'jquery';

export const LoanAddOn = ({data, banks}) =>{
    const timeoutRef = useRef();
    
    const idRef = useRef();
    const addOnRef = useRef();

    const remove = (e) =>{
        $(e.currentTarget).parent().parent().remove();
    }

    const onBankChange = (e) =>{
        const bank = banks.find((b)=>b?.attributes?.name === e.target.value);
        if(!bank) return;
        $(addOnRef.current).find('[name=number]').val(bank?.attributes?.number);
    }

    useEffect(()=>{
        if(!data) return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            $(addOnRef.current).find('select[name=bank]').find('option').each((i, option)=>{
                if($(option).text() === data?.attributes?.name) $(option).attr('selected', 'selected');
                else $(option).removeAttr('selected');
            });
        }, 100);
    }, [data, banks]);

    return(
        <div ref={addOnRef} className="w-100 mb-2" data-loan="">
            <div className="allowance-row border m-3 text-nowrap">
                <div className="input-group">
                    <span className="input-group-text"><PiBankFill/></span>
                    <select onChange={onBankChange} className="form-control shadow-none" name="bank" defaultValue={data?.attributes?.name || 'Select loan'}>
                        {banks?.map?.((bank, key)=>(
                            <option key={key}>{bank?.attributes?.name}</option>
                        ))}
                        <option hidden>Select loan</option>
                    </select>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <input onChange={()=>{}} className="form-control shadow-none" name="number" placeholder={'Bank Number'} defaultValue={data?.attributes?.number}/>
                    <div className="input-group ms-2">
                        <span className="input-group-text">$</span>
                        <input className="form-control shadow-none" name="amount" type="number" placeholder={'0.00'} defaultValue={data?.attributes?.amount}/>
                    </div>
                </div>
                <span onClick={remove} className="close" title="Remove"><IoClose className="fs-4"/></span>
            </div>
            <input ref={idRef} hidden value={data?.id} name="id" onChange={()=>{}} />
            <input hidden value={data?.linkId} name="linkId" onChange={()=>{}} />
        </div>
    )
}

export const LoanAddOnExisting = ({data, banks}) =>{
    useEffect(()=>{
        
    }, []);

    return(
        <LoanAddOn data={data} banks={banks} />
    )
}

