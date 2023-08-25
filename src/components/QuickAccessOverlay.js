import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { RiNotificationBadgeFill } from 'react-icons/ri';
import { Overlay } from "../container/Overlay";
import notificImg from '../images/no-notific.png';
import { FaAccessibleIcon } from "react-icons/fa";

export const QuickAccessOverlay = ({children}) =>{
    const [quickAccess, setQuickAccess] = useState([]);
    return(
        <Overlay title={children}>
            <div className="" style={{minWidth: '360px'}}>
                <div className="border-bottom px-2">Quick Access</div>
                <div className="overflow-auto" style={{maxHeight: '80vh'}}>
                    {
                        quickAccess.length ?
                        quickAccess.map((info, key)=>(
                            <div className="d-flex mb-2 p-2" key={key}>
                                <div className="me-2">
                                    <RiNotificationBadgeFill style={{fontSize: '50px'}}/>
                                </div>
                                <div className="small">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                                There is no one who loves pain itself</div>
                            </div>
                        )):
                        <div className="m-auto text-center fw-bold fs-5 text-muted" style={{width: '300px'}}>
                            <FaAccessibleIcon className="p-3 text-info" style={{fontSize: '100px'}}/>
                            <div>No Saved</div>
                        </div>
                    }
                </div>
            </div>
        </Overlay>
    )
}