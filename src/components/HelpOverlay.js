import React, { useState } from "react";
import { RiNotificationBadgeFill } from 'react-icons/ri';
import { Overlay } from "../container/Overlay";
import { TbProgressHelp } from 'react-icons/tb';
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";

export const HelpOverlay = ({children}) =>{
    const navigate = useNavigate();

    const helps = [
        {
            description: 'How to generate a report for a employee or bulk report/multiple employees',
            onClick: ()=>navigate(routes.help().nested().generatingReport())
        }
    ];
    return(
        <Overlay title={children}>
            <div className="" style={{minWidth: '360px'}}>
                <div className="border-bottom px-2">Help</div>
                <div className="overflow-auto" style={{maxHeight: '80vh'}}>
                    {
                        helps.length ?
                        helps.map((help, key)=>(
                            <div onClick={help.onClick} className="d-flex mb-2 p-2 pointer" key={key}>
                                <div className="me-2">
                                    <RiNotificationBadgeFill style={{fontSize: '50px'}}/>
                                </div>
                                <div className="small">{help.description}</div>
                            </div>
                        )):
                        <div className="m-auto text-center fw-bold fs-5 text-muted" style={{width: '300px'}}>
                            <TbProgressHelp className="p-3 text-info" style={{fontSize: '100px'}}/>
                            <div>Help</div>
                        </div>
                    }
                </div>
            </div>
        </Overlay>
    )
}