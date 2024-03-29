import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { FcSettings } from "react-icons/fc";
import { TbLockShare } from 'react-icons/tb';
import { ChangeCredential } from "../utils/ChangeCredential";
import { useAuth } from "../auth/AuthProvider";
import { AlertOverlay } from "./AlertOverlay";
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";

const creds = new ChangeCredential();
export const Security = () =>{
    const { user } = useAuth([]);

    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        
    }, []);
    return(
        <div className="page text-wrap">
            <div className="border-bottom p-2 fw-bold">Security settings: {user?.attributes?.name}</div>
            <ul className="list-group mt-4">
                <li className="small list-group-item d-flex align-items-center py-4">
                    <div><TbLockShare className="display-5"/></div>
                    <div className="ms-2">
                        <button onClick={creds.open} className="btn btn-sm border-0 p-0 small fw-bold">Change Password</button>
                        <div className="small text-wrap">Set up a unique, strong password to protect your Account.</div>
                        <div className="small">Password must be at least 7 digits, contain a capital letter, number (0-9) and a special character</div>
                    </div>
                </li>
                <li className="small list-group-item d-flex align-items-center py-4">
                    <div><FcSettings className="display-5"/></div>
                    <div className="ms-2">
                        <button onClick={()=>setShowAlert(true)} className="btn btn-sm border-0 p-0 small fw-bold">Two-Factor Authentication</button>
                        <div className="small">Highly recommended. Set up Two-Factor Authentication to add an extra layer of security to your Account.</div>
                    </div>
                </li>
                <li className="small list-group-item d-flex align-items-center py-4">
                    <div><RiLockPasswordFill className="display-5"/></div>
                    <div className="ms-2">
                        <button onClick={()=>navigate(routes.settings().nested().listEmployeesSettings())} className="btn btn-sm border-0 p-0 small fw-bold">Assign Credential to user</button>
                        <div className="small">Assigning credential to a user will grant them access to this application. A email will be send for verification provided that the user email is valid.</div>
                        <div className="small fw-bold text-muted">User cannot gain access without a validated email.</div>
                    </div>
                </li>
            </ul>
            <AlertOverlay 
                isOpen={showAlert}
                onClose={()=>setShowAlert(false)}
                title={'Two-Factor Authentication'}
                description={'Two-Factor Authentication is not available at this time'}
            />
        </div>
    )
}