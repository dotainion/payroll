import React from "react";
import { Routes, Route } from 'react-router-dom';
import { routes } from "./routes";
import { CalendarLayout } from "../layout/CalendarLayout";
import { Day } from "../calendar/Day";
import { Week } from "../calendar/Week";
import { Month } from "../calendar/Month";
import { Schedule } from "../calendar/Schedule";

export const CalendarRouter = () =>{
    return(
        <CalendarLayout>
            <Routes>
                <Route path={routes.calendar().day()} element={<Day/>}/>
                <Route path={routes.calendar().week()} element={<Week/>}/>
                <Route path={routes.calendar().month()} element={<Month/>}/>
                <Route path={routes.calendar().schedule()} element={<Schedule/>}/>
            </Routes>
        </CalendarLayout>
    )
}