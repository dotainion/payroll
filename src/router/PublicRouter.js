import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { Signin } from "../accounts/Signin";
import { PasswrodRecovery } from "../accounts/PasswordRecovery";
import { Testing } from "../test/Testing";
import { AssignPassword } from "../accounts/AssignPassword";

export const PublicRouter = () =>{
    return(
        <Routes>
            <Route path={routes.signin()} element={<Signin/>}/>
            <Route path={routes.passRecovery()} element={<PasswrodRecovery/>}/>
            <Route path={routes.default()} element={<Navigate to={routes.signin()}/>}/>
            <Route path={'*'} element={<Navigate to={routes.signin()}/>}/>
            <Route path={'test/:url'} element={<Testing/>}/>
        </Routes>
    )
}