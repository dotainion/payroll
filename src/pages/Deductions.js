import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { AddOn } from "../addons/Addons";
import { payload } from "../utils/AddonsPayload";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";

export const Deductions = () =>{
    const [deductions, setDeductions] = useState([]);

    const scrollRef = useRef();
    const closeRef = useRef();
    const buttonRef = useRef();
    const inputContainerRef = useRef();

    const onSave = () =>{
        const data = payload.addon.build(inputContainerRef.current)[0];
        api.deduction.create(data).then((response)=>{
            setDeductions((deduct)=>[response.data.data[0], ...deduct]);
            const addOn = $(inputContainerRef.current).find('[data-addon]');
            addOn.find('input').val('');
            addOn.find('select').each((i, child)=>{
                $(child).find('option').removeAttr('selected');
                $(child).find('option[hidden]').attr('selected', 'selected');
            });
            toast.success('Deduction', 'Created');
        }).catch((error)=>{
            toast.error('Deduction', error);
        });
    }

    const onDelete = (e) =>{
        const parent = $(e.currentTarget).parent().parent().parent().parent();
        const data = payload.addon.build(parent)[0];
        api.deduction.delete(data?.id).then((response)=>{
            parent.remove();
            toast.success('Deduction', 'Deleted');
        }).catch((error)=>{
            console.log(error);
            toast.error('Deduction', error);
        });
    }

    const onEdit = (e) =>{
        const parent = $(e.currentTarget).parent().parent().parent();
        const data = payload.addon.build(parent)[0];
        api.allowance.edit(data).then((response)=>{
            onCloseAllEdit();
            parent.find('[data-read-only]').each((i, child)=>{
                $(child).find('[data-name]').text(data.name);
                $(child).find('[data-type]').text(data.type);
                $(child).find('[data-amount]').text(data.amount);
                $(child).find('[data-rate]').text(data.rate);
                $(child).find('[data-rate-amount]').text(data.rateAmount);
            });
            toast.success('Deduction', 'Edited');
        }).catch((error)=>{
            console.log(error);
            toast.error('Deduction', error);
        });
    }

    const onOpenEdit = (e) =>{
        onCloseAllEdit();
        const parent = $(e.currentTarget).parent().parent().parent().parent();
        parent.find('[data-editable]').show('fast');
        parent.find('[data-read-only]').hide('fast');
    }

    const onCloseAllEdit = () =>{
        const parent = $('[data-read-only]').parent();
        parent.find('[data-editable]').hide('fast');
        parent.find('[data-read-only]').show('fast');
    }

    useEffect(()=>{
        api.deduction.list().then((response)=>{
            setDeductions(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    useEffect(()=>{
        $(buttonRef.current).click(()=>{
            $(buttonRef.current).hide('fast');
            $(inputContainerRef.current).show('fast');
            $(scrollRef.current).css({height: '60vh'});
        });
        $(closeRef.current).click(()=>{
            $(buttonRef.current).show('fast');
            $(inputContainerRef.current).hide('fast');
            $(scrollRef.current).css({height: '75vh'});
        });
        $(scrollRef.current).css({height: '75vh'});
        $(window).click(()=>onCloseAllEdit());
    }, []);

    return(
        <div className="page profile text-nowrap">
            <div className="border-bottom p-2 fw-bold bg-warning text-dark mt-2">Deductions</div>
            <div className="my-3">
                <button ref={buttonRef} className="btn btn-info btn-sm">New Deduction +</button>
            </div>
            <div className="data-addon-customize" ref={inputContainerRef}>
                <AddOn/>
                <div className="my-3">
                    <button onClick={onSave} className="btn btn-sm btn-info px-3">Save</button>
                    <button ref={closeRef} className="btn btn-sm btn-info px-3 text-danger ms-3">Cancel</button>
                </div>
            </div>
            <hr></hr>
            <div ref={scrollRef} className="overflow-auto">
                {deductions.map((deduct, key)=>(
                    <div onClick={(e)=>e.stopPropagation()} className="my-2" key={key}>
                        <div data-read-only="">
                            <div className="d-flex align-items-center border w-100 bg-light">
                                <div className='d-flex align-items-center w-100 px-2 py-1'>
                                    <div className='w-50'>
                                        <div className="fw-bold small p-0 m-0"><small>Name:</small></div>
                                        <div className="text-truncate" style={{marginTop: '-5px'}} data-name="">{deduct?.attributes?.name}</div>
                                    </div>
                                    <div className="ms-3 w-50">
                                        <div className="fw-bold small p-0 m-0"><small>Type:</small></div>
                                        <div className="text-truncate" style={{marginTop: '-5px'}} data-type="">{deduct?.attributes?.type}</div>
                                    </div>
                                    <div className="ms-3 w-50">
                                        <div className="fw-bold small p-0 m-0"><small>Amount:</small></div>
                                        <div className="text-truncate" style={{marginTop: '-5px'}} data-amount="">{deduct?.attributes?.amount}</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center px-2">
                                    <button onClick={onOpenEdit} className="btn btn-sm btn-outline-primary px-4 py-0">Edit</button>
                                    <button onClick={onDelete} className="btn btn-sm btn-outline-danger px-3 ms-2 py-0">Delete</button>
                                </div>
                            </div>
                            {deduct?.attributes?.rate?
                            <div className="d-flex align-items-center w-100 small px-2">
                                <div className="bg-white text-info border-bottom border-start text-truncate" style={{width: '150px'}} data-rate="">Rate: {deduct?.attributes?.rate}</div>
                                <div className="bg-white text-info border-bottom border-end text-truncate" style={{width: '150px'}} data-rate-amount="">Amount: {deduct?.attributes?.rateAmount}</div>
                            </div>:null}
                        </div>
                        <div className="border border-info p-1 mb-3" data-editable="" style={{display: 'none'}}>
                            <AddOn data={deduct}/>
                            <div className="d-flex align-items-center justify-content-end my-2">
                                <button onClick={onCloseAllEdit} className="btn btn-sm btn-outline-secondary px-3 ms-2 py-0">close</button>
                                <button onClick={onEdit} className="btn btn-sm btn-outline-success px-3 ms-2 py-0">Update</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}