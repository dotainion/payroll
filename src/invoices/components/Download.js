import React, { useEffect, useRef } from "react";  
import { jsPDF } from 'jspdf';
import $ from 'jquery';

const pdf = new jsPDF({
    orientation: "p",
    unit: 'pt',
    format: 'a4'
});

export const Download = ({className, title, targetRef}) =>{
    const onDownload = () =>{
        const position = 30;
        const clone = $(targetRef.current).clone()[0];
        $(clone).css({width: pdf.internal.pageSize.getWidth() - position});
        $(clone).addClass('payslip-bulk-print');
        pdf.html(clone, {
            callback: (doc)=> doc.save('fishes.pdf'),
            x: position / 2, y: position / 2,
        });
    }

    return(
        <button onClick={onDownload} className={className}>{title}</button>
    )
}