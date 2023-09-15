import React, { useEffect, useRef } from "react";  
import { jsPDF } from 'jspdf';
import $ from 'jquery';
import { File } from "../../utils/File";

/*const pdf = new jsPDF({
    orientation: "p",
    unit: 'pt',
    format: 'a4'
});*/
const file = new File();
export const Download = ({className, title, targetRef}) =>{
    const onDownload = () =>{
        /*const position = 30;
        const clone = $(targetRef.current).clone()[0];
        $(clone).css({width: pdf.internal.pageSize.getWidth() - position});
        $(clone).addClass('payslip-bulk-print');
        pdf.html(clone, {
            callback: (doc)=> doc.save('fishes.pdf'),
            x: position / 2, y: position / 2,
        });*/
        file.download(targetRef.current);
    }

    return(
        <button onClick={onDownload} className={className}>{title}</button>
    )
}