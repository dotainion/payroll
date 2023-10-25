import React, { useEffect, useRef, useState } from 'react';
import { api } from '../request/Api';
import $ from 'jquery';
import { reportPayload } from '../utils/ReportPayload';

export const TaxAlert = () =>{
    const [setting, setSetting] = useState();
    const [message, setMessage] = useState();
    const [applied, setApplied] = useState();
    const [netSalary, setNetSalary] = useState();

    const taxAlertRef = useRef();
    const settingRef = useRef();
    const netRef = useRef();

    const appy = () =>{
        setApplied(true);
        $(taxAlertRef.current).find('[name=notify]').val('notified');
    }

    const undo = () =>{
        setApplied(false);
        $(taxAlertRef.current).find('[name=notify]').val('');
    }

    const fetchReport = async() =>{
        let net = null;
        try{
            const data = reportPayload.payload().first();
            const response = await api.report.calculateReport(data);
            net = response.data.data[0].attributes.netSalary;
            setNetSalary(net);
        }catch{}
        return net;
    }

    const handleAction = (net) =>{
        if(!settingRef.current || !settingRef.current?.attributes?.active) return;
        if(!settingRef.current.attributes.limitAmount || !net) return;
        if(parseFloat(settingRef.current.attributes.limitAmount || 0) > parseFloat(net || 0)) return;
        if(settingRef.current.attributes.auto){
            appy();
            setMessage(`Tax deduction of ${settingRef.current.attributes.percentage}% will automatically added to this report.`);
        }else if(settingRef.current.attributes.notify){
            setMessage(`Tax deduction of ${settingRef.current.attributes.percentage}% is required to complete this report.`);
        }else if(settingRef.current.attributes.notifyAndAuto){
            appy();
            setMessage(`Tax deduction of ${settingRef.current.attributes.percentage}% has will be applied to this report.`);
        }
    }

    const apiTrigger = () =>{
        api.tax.list().then(async(response)=>{
            const sorted = response.data.data.sort((a, b)=>{
                return parseFloat(a.attributes.limitAmount || 0) - parseFloat(b.attributes.limitAmount || 0);
            });
            const reverseSorted = sorted.reverse();
            netRef.current = await fetchReport();
            for(let stg of reverseSorted){
                if(parseFloat(netRef.current || 0) >= parseFloat(stg.attributes.limitAmount || 0)){
                    settingRef.current = stg;
                    setSetting(stg);
                    handleAction(netRef.current);
                    break;
                }
            };
        }).catch((error)=>{
            
        });
    };

    useEffect(()=>{
        const element = $(taxAlertRef.current).parent().parent();
        element.on('change', ()=>{apiTrigger()}).trigger('change');
    }, []);

    return(
        <div ref={taxAlertRef} data-tax-alert-salery={netSalary} data-tax-state="">
            <input name="notify" hidden/>
            {message && <div className="alert alert-info my-3">
                <div>{message}</div>
                {setting?.attributes?.notify && <div>
                    {
                        applied
                            ? <button onClick={undo} className="btn btn-sm btn-secondary px-3 my-2">Undo</button>
                            : <button onClick={appy} className="btn btn-sm btn-primary px-3 my-2">Apply tax deduction</button>
                    }
                </div>}
            </div>}
        </div>
    )
}