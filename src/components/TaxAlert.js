import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';

export const TaxAlert = ({netSalary, meta}) =>{
    const [message, setMessage] = useState();
    const [applied, setApplied] = useState();
    const [userAction, setUserAction] = useState();

    const idRef = useRef();
    const taxRef = useRef();

    const appy = () =>{
        setApplied(true);
        $(taxRef.current).val('notified');
    }

    const undo = () =>{
        setApplied(false);
        $(taxRef.current).val('');
    }

    useEffect(()=>{
        if(!meta) return;
        if(!meta || !meta.active || !meta.hasTaxDeduction) return setMessage(null);
        if(meta.auto){
            appy();
            setUserAction(false);
            setMessage(`Tax deduction of ${meta.percentage}% will automatically added to this report.`);
        }else if(meta.notify){
            setUserAction(true);
            setMessage(`Tax deduction of ${meta.percentage}% is required to complete this report.`);
        }else if(meta.notifyAndAuto){
            appy();
            setUserAction(false);
            setMessage(`Tax deduction of ${meta.percentage}% has will be applied to this report.`);
        }
        idRef.current.value = meta.id;
    }, [meta]);

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