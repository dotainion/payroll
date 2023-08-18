import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';

export const Notifications = () =>{
    const [list, setList] = useState([]);

    useEffect(()=>{
        
    }, []);
    return(
        <div className="page text-nowrap user-select-none">
            <div className="border-bottom p-2 fw-bold">Notification Settings</div>
            <div className="my-2">Send me a notification when:</div>
            <ul className="list-group">
                <li className="small list-group-item">
                    <label className="d-flex align-items-center pointer">
                        <input className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                        <div>A new record is created and assigned to me</div>
                    </label>
                </li>
            
                <li className="small list-group-item">
                    <label className="d-flex align-items-center pointer">
                        <input className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                        <div>A record I follow is updated</div>
                    </label>
                </li>
                <li className="small list-group-item">
                    <label className="d-flex align-items-center pointer">
                        <input className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                        <div>A record I follow has a new discussion</div>
                    </label>
                </li>
                <li className="small list-group-item">
                    <label className="d-flex align-items-center pointer">
                        <input className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                        <div>I am mentioned in a discussion</div>
                    </label>
                </li>
            </ul>
            <div className="mt-3">Email me a roundup of my unread notifications</div>
            <select className="form-select shadow-none">
                <option>I do not want to receive roundup</option>
                <option>Every hour</option>
                <option>Every morning (07:00 AM)</option>
                <option>Every evening (06:00 PM)</option>
            </select>
            <hr></hr>
        </div>
    )
}