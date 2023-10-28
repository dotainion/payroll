import React, { useEffect, useRef } from "react";  
import $ from 'jquery';
import { api } from "../../request/Api";
import { toast } from "../../utils/Toast";
import { ElementHandler } from "../../utils/ElementHandler";
import { v4 as uuidv4 } from 'uuid';

const handler = new ElementHandler();
export const SendMail = ({className, title, targetRef}) =>{
    const extractAttatchments = (element) =>{
        let attatchments = [];
        $(element).find('img').each((i, img)=>{
            const base64Img = $(img).attr('src');
            const attatchmentId = uuidv4();
            attatchments.push({img: base64Img, contentId: attatchmentId});
            $(img).attr('src', `cid:${attatchmentId}`);
        });
        return {attatchments, element};
    }
    const onSEndEmail = () =>{
        let mails = [];
        const clone = $(targetRef.current).clone();
        $(clone).find('[data-payslip]').each((i, child)=>{
            handler.applyInlineStyle(child);
            const extract = extractAttatchments(child);
            mails.push({
                userId: $(child).find('input[name=userId]').val(),
                reportId: $(child).find('input[name=reportId]').val(),
                subject: 'Payslip',
                body: $(extract.element).html(),
                attatchments: extract.attatchments
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