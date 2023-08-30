import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { SettingsLayout } from "../layout/SettingsLayout";
import { Profile } from "../pages/Profile";
import { Security } from "../pages/Security";
import { Notifications } from "../pages/Notifications";
import { Allowances } from "../pages/Allowances";
import { Deductions } from "../pages/Deductions";
import { Banks } from "../pages/Banks";
import { Settings } from "../pages/Settings";
import { Departments } from "../pages/Departments";

export const SettingsRouter = () =>{
    return(
        <SettingsLayout>
            <Routes>
                <Route path={routes.settings().profile()} element={<Profile/>}/>
                <Route path={routes.settings().security()} element={<Security/>}/>
                <Route path={routes.settings().notifications()} element={<Notifications/>}/>
                <Route path={routes.settings().allowances()} element={<Allowances/>}/>
                <Route path={routes.settings().deductions()} element={<Deductions/>}/>
                <Route path={routes.settings().departments()} element={<Departments/>}/>
                <Route path={routes.settings().banks()} element={<Banks/>}/>
                <Route path={routes.settings().settings()} element={<Settings/>}/>
                <Route path={'*'} element={<Navigate to={routes.settings().security()}/>}/>
            </Routes>
        </SettingsLayout>
    )
}