import React from "react";
import { FaCalendarAlt, FaBell, FaQuestion } from 'react-icons/fa';
import { BsFillLightningChargeFill, BsPersonFill } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { ProfileMenu } from "./ProfileMenu";
import { Tooltip } from "../container/Tooltip";
import { useEffect } from "react";

export const NavigationBar = () =>{
    return(
        <nav className="navbar navbar-light">
            <div className="d-flex justify-content-end w-100">
                <Tooltip title={'Calendar'}>
                    <div className="nav-icon-item text-secondary"><FaCalendarAlt/></div>
                </Tooltip>
                <Tooltip title={'Quick Access'}>
                    <div className="nav-icon-item text-secondary"><BsFillLightningChargeFill/></div>
                </Tooltip>
                <Tooltip title={'Notfications'}>
                    <div className="nav-icon-item text-secondary"><FaBell/></div>
                </Tooltip>
                <Tooltip title={'Help'}>
                    <div className="nav-icon-item text-secondary"><FaQuestion/></div>
                </Tooltip>
                <ProfileMenu/>
            </div>
        </nav>
    )
}