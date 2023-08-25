import React, { useState } from "react";
import { Overlay } from "../container/Overlay";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const CalendarOverlay = ({children}) =>{
    const [value, onChange] = useState(new Date());
    return(
        <Overlay title={children}>
            <div className="">
                <div className="border-bottom px-2">Calendar</div>
                <Calendar className="border-0" onChange={onChange} value={value} />
            </div>
        </Overlay>
    )
}