import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { AddOn } from "../addons/Addons";
import { payload } from "../utils/AddonsPayload";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { CostTypeAndRateHandler } from "../utils/CostTypeAndRateHandler";
import { AllowanceDeductionReadOnly } from "../components/AllowanceDeductionReadOnly";
import { useDocument } from "../contents/DocumentProvider";

const typeHandler = new CostTypeAndRateHandler();
export const Deductions = () =>{
    const { costTypes } = useDocument();

    const [deductions, setDeductions] = useState([]);

    const scrollRef = useRef();
    const closeRef = useRef();
    const buttonRef = useRef();
    const inputContainerRef = useRef();

    const getTypeFqn = (typeValue) =>{
        let fqo = null;
        [...Object.keys(costTypes || {})].find((type)=>{
            if(costTypes[type].value === typeValue) fqo = costTypes[type];
        });
        return fqo?.name || null;
    }

    const onSave = () =>{
        const data = payload.addon.build(inputContainerRef.current)[0];
        api.deduction.create(data).then((response)=>{
            let newDeduction = response.data.data[0];
            newDeduction.attributes.type = getTypeFqn(newDeduction.attributes.type);
            setDeductions((deduct)=>[...deduct, newDeduction]);
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
            const newDeduction = response.data.data[0];
            setDeductions((existingDeductions)=>{
                let modifyDeductions = [];
                existingDeductions.forEach((oldDeduction)=>{
                    if(oldDeduction.id === newDeduction.id) modifyDeductions.push(newDeduction);
                    else modifyDeductions.push(oldDeduction);
                });
                return modifyDeductions;
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
                        <AllowanceDeductionReadOnly data={deduct} onOpen={onOpenEdit} onDelete={onDelete} />
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

