import React, { useEffect, useRef, useState } from 'react';
import { api } from '../request/Api';
import $ from 'jquery';
import { reportPayload } from '../utils/ReportPayload';
import { ErrorResponseHandler } from '../utils/ErrorResponseHandler';
import { TaxAlert } from './TaxAlert';

export const TaxAlertContainer = ({onSalaryChange, existingTaxDeduction}) =>{
    const [taxDeductions, setTaxDedutions] = useState([]);
    const [netSalary, setNetSalary] = useState();

    const taxContainerRef = useRef();

    const apiTrigger = () =>{
        const data = reportPayload.payload().first();
        api.report.calculateReport(data).then((response)=>{
            setNetSalary(response.data.data[0].attributes.netSalary);
            const taxDeduction = response.data.data[0].attributes.allDeductions.find((d)=>d.type === 'tax');
            if(!taxDeduction) setTaxDedutions([]);
        }).catch((error)=>{
            const metaData = new ErrorResponseHandler().meta(error);
            setTaxDedutions(metaData?.data || []);
        });
        console.log('hello world...')
    };

    useEffect(()=>{
        onSalaryChange?.(netSalary);
    }, [netSalary]);

    useEffect(()=>{
        const element = $(taxContainerRef.current).parent().parent();
        element.on('change', ()=>apiTrigger()).trigger('change');
    }, []);

    return(
        <div ref={taxContainerRef} className="mx-3" data-alert-container="">
            {taxDeductions.map((meta, key)=>(
                <TaxAlert netSalary={netSalary} meta={meta} key={key} />
            ))}
        </div>
    )
}