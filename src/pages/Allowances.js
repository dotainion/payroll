import React, { useCallback, useRef } from "react";
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
export const Allowances = () =>{
    const { costTypes } = useDocument();

    const [allowances, setAllowances] = useState([]);
    const [availableData, setAvailableData] = useState([]);

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

    const onSave = useCallback(() =>{
        const data = payload.addon.build(inputContainerRef.current)[0];
        api.allowance.create(data).then((response)=>{
            let newAllowance = response.data.data[0];
            newAllowance.attributes.type = getTypeFqn(newAllowance.attributes.type);
            setAllowances((allows)=>[...allows, newAllowance]);
            const addOn = $(inputContainerRef.current).find('[data-addon]');
            addOn.find('input').val('');
            addOn.find('select').each((i, child)=>{
                $(child).find('option').removeAttr('selected');
                $(child).find('option[hidden]').attr('selected', 'selected');
            });
            toast.success('Allowance', 'Created');
        }).catch((error)=>{
            console.log(error);
            toast.error('Allowance', error);
        });
    });

    const onEdit = (e) =>{
        const parent = $(e.currentTarget).parent().parent().parent();
        const data = payload.addon.build(parent)[0];
        api.allowance.edit(data).then((response)=>{
            console.log(response.data);
            onCloseAllEdit();
            const newAllowance = response.data.data[0];
            setAllowances((existingAllowances)=>{
                let modifyAllowances = [];
                existingAllowances.forEach((oldAllowance)=>{
                    if(oldAllowance.id === newAllowance.id) modifyAllowances.push(newAllowance);
                    else modifyAllowances.push(oldAllowance);
                });
                return modifyAllowances;
            });
            toast.success('Allowance', 'Edited');
        }).catch((error)=>{
            console.log(error);
            toast.error('Allowance', error);
        });
    };

    const onDelete = (e) =>{
        const parent = $(e.currentTarget).parent().parent().parent().parent();
        const data = payload.addon.build(parent)[0];
        api.allowance.delete(data?.id).then((response)=>{
            parent.remove();
            toast.success('Allowance', 'Deleted');
        }).catch((error)=>{
            console.log(error);
            toast.error('Allowance', error);
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
        api.allowance.list().then((response)=>{
            setAllowances(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });

        api.allowanceDeductionIdLink.list().then((response)=>{
            console.log(response.data.data);
            setAvailableData(response.data.data);
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
            <div className="border-bottom p-2 fw-bold bg-primary text-white mt-2">Allowances</div>
            <div className="my-3">
                <button ref={buttonRef} className="btn btn-info btn-sm">New Allowance +</button>
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
                {allowances.map((allow, key)=>(
                    <div onClick={(e)=>e.stopPropagation()} className="my-2" key={key}>
                        <AllowanceDeductionReadOnly data={allow} availableData={availableData} onOpen={onOpenEdit} onDelete={onDelete} />
                        <div className="border border-info p-1 mb-3" data-editable="" style={{display: 'none'}}>
                            <AddOn data={allow}/>
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

