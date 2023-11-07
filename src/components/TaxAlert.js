import React, { useEffect, useRef, useState } from 'react';
import { api } from '../request/Api';
import $ from 'jquery';
import { reportPayload } from '../utils/ReportPayload';
import { ErrorResponseHandler } from '../utils/ErrorResponseHandler';

export const TaxAlert = ({onSalaryChange, taxDeduction}) =>{
    const [message, setMessage] = useState();
    const [applied, setApplied] = useState();
    const [netSalary, setNetSalary] = useState();

    const taxAlertRef = useRef();
    const appy = () =>{
        setApplied(true);
        $(taxAlertRef.current).find('[name=notify]').val('notified');
    }

    const undo = () =>{
        setApplied(false);
        $(taxAlertRef.current).find('[name=notify]').val('');
    }

    const apiTrigger = () =>{
        const data = reportPayload.payload().first();
        api.report.calculateReport(data).then((response)=>{
            setNetSalary(response.data.data[0].attributes.netSalary);
            const taxDeduction = response.data.data[0].attributes.allDeductions.find((d)=>d.type === 'tax');
            if(!taxDeduction) setMessage(null);
        }).catch((error)=>{
            const meta = new ErrorResponseHandler().meta(error);
            if(!meta || !meta.active || !meta.hasTaxDeduction || !meta.required) return setMessage(null);
            if(meta.auto){
                appy();
                setMessage(`Tax deduction of ${meta.percentage}% will automatically added to this report.`);
            }else if(meta.notify){
                setMessage(`Tax deduction of ${meta.percentage}% is required to complete this report.`);
            }else if(meta.notifyAndAuto){
                appy();
                setMessage(`Tax deduction of ${meta.percentage}% has will be applied to this report.`);
            }
        });
    };

    useEffect(()=>{
        onSalaryChange?.(netSalary);
    }, [netSalary]);

    useEffect(()=>{
        const element = $(taxAlertRef.current).parent().parent();
        element.on('change', ()=>apiTrigger()).trigger('change');
    }, []);

    useEffect(()=>{
        if(!taxDeduction) return;
        appy();
    }, [taxDeduction]);

    return(
        <div ref={taxAlertRef} data-tax-alert-salery={netSalary} data-tax-state="">
            <input name="notify" hidden/>
            {message && <div className="alert alert-info my-3">
                <div>{message}</div>
                {
                    applied
                        ? <button onClick={undo} className="btn btn-sm btn-secondary px-3 my-2">Undo</button>
                        : <button onClick={appy} className="btn btn-sm btn-primary px-3 my-2">Apply tax deduction</button>
                }
            </div>}
        </div>
    )
}