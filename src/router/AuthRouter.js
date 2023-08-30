import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { WorkspaceRouter } from "./WorkspaceRouter";
import { SettingsRouter } from "./SettingsRouter";
import { Testing } from "../test/Testing";

export const AuthRouter = () =>{
    return(
        <Routes>
            <Route path={routes.workspace().default()} element={<WorkspaceRouter/>}/>
            <Route path={routes.settings().default()} element={<SettingsRouter/>}/>
            <Route path={routes.default()} element={<Navigate to={routes.workspace().default()}/>}/>
            <Route path={'test/:url'} element={<Testing/>}/>
            <Route path={'*'} element={<Navigate to={routes.workspace().default()}/>}/>
        </Routes>
    )
}