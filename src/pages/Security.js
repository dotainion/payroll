import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { FcSettings } from "react-icons/fc";
import { TbLockShare } from 'react-icons/tb';
import { ChangeCredential } from "../utils/ChangeCredential";

const creds = new ChangeCredential();
export const Security = () =>{
    const [list, setList] = useState([]);

    useEffect(()=>{
        
    }, []);
    return(
        <div className="page text-nowrap">
            <div className="border-bottom p-2 fw-bold">Security settings</div>
            <ul className="list-group mt-4">
                <li className="small list-group-item d-flex align-items-center">
                    <TbLockShare className="display-5"/>
                    <div className="ms-2">
                        <button onClick={creds.open} className="btn btn-sm border-0 p-0 small fw-bold">Change Password</button>
                        <div className="small">Set up a unique, strong password to protect your Fusioo Account.</div>
                    </div>
                </li>
                <li className="small list-group-item d-flex align-items-center">
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