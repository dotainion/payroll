import React from "react";
import { FaCalendarAlt, FaBell, FaQuestion } from 'react-icons/fa';
import { BsFillLightningChargeFill, BsPersonFill } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { ProfileMenu } from "./ProfileMenu";
import { Tooltip } from "../container/Tooltip";
import { NotificationOverlay } from "../components/NotificationOverlay";
import { QuickAccessOverlay } from "../components/QuickAccessOverlay";
import { HelpOverlay } from "../components/HelpOverlay";
import { CalendarOverlay } from "../components/CalendarOverlay";

export const NavigationBar = () =>{
    return(
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
    )
}