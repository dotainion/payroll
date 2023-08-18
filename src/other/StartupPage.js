import React from "react";
import logo from '../images/logo.png';

export const StartupPage = () =>{
    return(
        <div className="welcome-page">
            <div className="fw-bold fs-5 text-center">
                <img src={logo} className="mb-3" alt="" /> 
                <div>Starting Workspace Application</div>
            </div>
        </div>
    )
}