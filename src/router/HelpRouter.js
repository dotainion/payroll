import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { HelpLayout } from "../layout/HelpLayout";
import { GeneratingReports } from "../help/GeneratingReports";

export const HelpRouter = () =>{
    return(
        <HelpLayout>
            <Routes>
                <Route path={routes.help().generatingReport()} element={<GeneratingReports/>}/>
                <Route path={'*'} element={<Navigate to={routes.help().generatingReport()}/>}/>
            </Routes>
        </HelpLayout>
    )
}