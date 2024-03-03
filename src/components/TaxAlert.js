import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import { toast } from '../utils/Toast';
import { useParams } from 'react-router-dom';

export const TaxAlert = ({existingTaxDeductions, netSalary, meta}) =>{
    const [message, setMessage] = useState();
    const [applied, setApplied] = useState();
    const [userAction, setUserAction] = useState();

    const params = useParams();

    const idRef = useRef();
    const taxRef = useRef();
    const timeoutRef = useRef();

    const appy = () =>{
        setApplied(true);
        $(taxRef.current).val('notified');
    }

    const undo = () =>{
        setApplied(false);
        $(taxRef.current).val('');
    }

    const parseMessage = (type, percentage) =>{
        const messages = {
            auto: {
                create: 'Tax deduction of $% will automatically be added to this report.',
                edit: 'Tax deduction of $% is applied.'
            },
            notify: {
                create: 'Tax deduction of $% is required to complete this report.',
                edit: 'Tax deduction of $% is applied on this report.'
            },
            notifyAndAuto: {
                create: 'Tax deduction of $% will be applied to this report.',
                edit: 'Tax deduction of $% has been applied.'
            },
        }
        const editing = params?.reportId ? 'edit' : 'create';
        return messages[type][editing].replace('$', percentage);
    }

    useEffect(()=>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if(!meta || !existingTaxDeductions?.length) return;
            const existingTax = existingTaxDeductions.find((tax)=>tax.id === meta.id);
            if(existingTax){
                appy();
                setUserAction(false);
            }
        }, 500);
    }, [meta, existingTaxDeductions]);

    useEffect(()=>{
        if(!meta) return;
        if(!meta || !meta.active || !meta.hasTaxDeduction) return setMessage(null);
        if(meta.auto){
            appy();
            setUserAction(false);
            setMessage(parseMessage('auto', meta.percentage));
        }else if(meta.notify){
            setUserAction(true);
            setMessage(parseMessage('notify', meta.percentage));
        }else if(meta.notifyAndAuto){
            appy();
            setUserAction(false);
            setMessage(parseMessage('notifyAndAuto', meta.percentage));
        }
        idRef.current.value = meta.id;
    }, [meta]);

    useEffect(()=>{
        if(!message) return;
        toast.notify('Tax deduction', message);
    }, [message]);

    return(
        <div data-tax-alert-salery={netSalary} data-tax-alert="">
            <input ref={taxRef} name="notify" hidden/>
            <div className="alert alert-info my-3">
                <div>{message}</div>
                {
                    userAction
                        ? <div>
                            {
                                applied
                                    ? <button onClick={undo} className="btn btn-sm btn-secondary px-3 my-2">Undo</button>
                                    : <button onClick={appy} className="btn btn-sm btn-primary px-3 my-2">Apply tax deduction</button>
                            }
                        </div>
                        : null
                }
            </div>
            <input ref={idRef} name="id" hidden/>
        </div>
    )
}