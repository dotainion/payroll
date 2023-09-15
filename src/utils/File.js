import { jsPDF } from 'jspdf';
import $ from 'jquery';

const pdf = new jsPDF({
    orientation: "p",
    unit: 'pt',
    format: 'a4'
});

export class File{
    fileName = 'invoice.pdf';

    constructor(){

    }

    on(target, callback, key){
        const position = 30;
        const clone = $(target).clone()[0];
        $(clone).css({width: pdf.internal.pageSize.getWidth() - position});
        $(clone).addClass('payslip-bulk-print');
        pdf.html(clone, {
            callback: (doc)=>{
                if(key === 'download'){
                    return doc.save(this.fileName);
                }
                callback?.(btoa(doc.output()));
            },
            x: position / 2, y: position / 2,
        });
    }

    download = (target) =>{
        this.on(target, null, 'download');
    }

    setFileName(name){
        this.fileName = name;
    }
}