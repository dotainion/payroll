import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { FcSettings } from "react-icons/fc";
import { TbLockShare } from 'react-icons/tb';
import { ChangeCredential } from "../utils/ChangeCredential";
import { useAuth } from "../auth/AuthProvider";

const creds = new ChangeCredential();
export const Security = () =>{
    const { user } = useAuth([]);

    useEffect(()=>{
        
    }, []);
    return(
        <div className="page text-nowrap">
            <div className="border-bottom p-2 fw-bold">Security settings: {user?.attributes?.name}</div>
            <ul className="list-group mt-4">
                <li className="small list-group-item d-flex align-items-center py-4">
                    <TbLockShare className="display-5"/>
                    <div className="ms-2">
                        <button onClick={creds.open} className="btn btn-sm border-0 p-0 small fw-bold">Change Password</button>
                        <div className="small text-wrap">Set up a unique, strong password to protect your Account.</div>
                        <div className="small">Password must be at least 7 digits, contain a capital letter, number (0-9) and a special character</div>
                    </div>
                </li>
                <li className="small list-group-item d-flex align-items-center py-4">
                    <FcSettings className="display-5"/>
                    <div className="ms-2">
                        <button className="btn btn-sm border-0 p-0 small fw-bold">Two-Factor Authentication</button>
                        <div className="small">Highly recommended. Set up Two-Factor Authentication to add an extra layer of security to your Account.</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}