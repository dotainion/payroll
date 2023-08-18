import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { AboutYou } from "../admin/AboutYou";
import { BusinessLayout } from "../layout/BusinessLayout";
import { Profile } from "../admin/Profile";
import { Credentials } from "../admin/Credentials";
import { Finalize } from "../admin/Finalize";
import { Testing } from "../test/Testing";

export const BusinessRouter = () =>{
    return(
        <BusinessLayout>
            <Routes>
                <Route path={routes.business().aboutYou()} element={<AboutYou/>}/>
                <Route path={routes.business().profile()} element={<Profile/>}/>
                <Route path={routes.business().credentials()} element={<Credentials/>}/>
                <Route path={routes.business().finalize()} element={<Finalize/>}/>
                <Route path={'*'} element={<Navigate to={routes.business().aboutYou()}/>}/>
                <Route path={routes.business().default()} element={<Navigate to={routes.business().aboutYou()}/>}/>
                <Route path={'test/:url'} element={<Testing/>}/>
            </Routes>
        </BusinessLayout>
    )
}