import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaBell, FaQuestion } from 'react-icons/fa';
import { BsFillLightningChargeFill, BsPersonFill } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { ProfileMenu } from "./ProfileMenu";
import { Tooltip } from "../container/Tooltip";
import { NotificationOverlay } from "../components/NotificationOverlay";
import { QuickAccessOverlay } from "../components/QuickAccessOverlay";
import { HelpOverlay } from "../components/HelpOverlay";
import { CalendarOverlay } from "../components/CalendarOverlay";
import { ProgressBar } from "react-bootstrap";
import { useDocument } from "../contents/DocumentProvider";

let toggle = true;
export const NavigationBar = () =>{
    const { loading } = useDocument();

    const [progress, setProgress] = useState(0);

    const intervalRef = useRef();

    const startProgressBar = () =>{
        intervalRef.current = setInterval(() => {            
            setProgress((val)=>{
                if(val >= 120) toggle  = false;
                if(val <= -10) toggle  = true;
                if(toggle) return val + 1;
                else return val - 1;
            });
        }, 80);
    }

    useEffect(()=>{
        if(loading) startProgressBar();
        else clearInterval(intervalRef.current);
    }, [loading]);

    return(
        <div>
            <nav className="navbar navbar-light">
                <div className="d-flex justify-content-end w-100">
                    <Tooltip title={'Calendar'}>
                        <CalendarOverlay>
                            <div className="nav-icon-item text-secondary"><FaCalendarAlt/></div>
                        </CalendarOverlay>
                    </Tooltip>
                    <Tooltip title={'Quick Access'}>
                        <QuickAccessOverlay>
                            <div className="nav-icon-item text-secondary"><BsFillLightningChargeFill/></div>
                        </QuickAccessOverlay>
                    </Tooltip>
                    <Tooltip title={'Notfications'}>
                        <NotificationOverlay>
                            <div className="nav-icon-item text-secondary"><FaBell/></div>
                        </NotificationOverlay>
                    </Tooltip>
                    <Tooltip title={'Help'}>
                        <HelpOverlay>
                            <div className="nav-icon-item text-secondary"><FaQuestion/></div>
                        </HelpOverlay>
                    </Tooltip>
                    <ProfileMenu/>
                </div>
            </nav>
            {loading && <div className="w-100">
                <ProgressBar striped animated now={progress} className="bg-white" variant="primary" style={{height: '3px'}} />
            </div>}
        </div>
    )
}