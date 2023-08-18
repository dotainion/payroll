import React, { useEffect, useRef } from "react";  
import $ from 'jquery';
import { api } from "../../request/Api";
import { toast } from "../../utils/Toast";
import { ElementHandler } from "../../utils/ElementHandler";

const handler = new ElementHandler();
export const SendMail = ({className, title, targetRef}) =>{
    const onSEndEmail = () =>{
        let mails = [];
        $(targetRef.current).find('[data-payslip]').each((i, child)=>{
            handler.applyInlineStyle(child);
            mails.push({
                userId: $(child).find('input[name=userId]').val(),
                reportId: $(child).find('input[name=reportId]').val(),
                subject: 'Payslip',
                body: $(child).html()
            });
        });

        api.mail.sendList(mails).then((response)=>{
            toast.success('Payslip', 'Email sent.');
        }).catch((error)=>{
            toast.error('Payslip', error);
        });
    }

    return(
        <button onClick={onSEndEmail} className={className}>{title}</button>
    )
}