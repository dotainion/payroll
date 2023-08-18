import React, { useEffect, useRef } from "react";  
import { useReactToPrint } from "react-to-print";
import $ from 'jquery';

export const Print = ({className, title, targetRef}) =>{
    const onPrint = useReactToPrint({
        documentTitle: 'GC Service',
        content: () => targetRef.current,

        onBeforeGetContent: () => {
            $(targetRef.current).addClass('payslip-bulk-print');
        },

        onAfterPrint: () => {
            $(targetRef.current).removeClass('payslip-bulk-print');
        }
    });

    useEffect(()=>{
        
    }, []);

    return(
        <button onClick={onPrint} className={className}>{title}</button>
    )
}