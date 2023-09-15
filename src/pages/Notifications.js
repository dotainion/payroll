import React, { useState, useEffect, useRef } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { api } from "../request/Api";
import { useAuth } from "../auth/AuthProvider";

export const Notifications = () =>{
    const { user } = useAuth();

    const navigate = useNavigate();

    const idRef = useRef(null); 
    const createdRef = useRef(); 
    const updatedRef = useRef(); 
    const deletedRef = useRef(); 
    const mentionedRef = useRef();

    const saveSetting = () =>{
        const data = {
            id: idRef.current, 
            userId: user?.id, 
            created: createdRef.current.checked, 
            updated: updatedRef.current.checked, 
            deleted: deletedRef.current.checked, 
            mentioned: mentionedRef.current.checked,
        }
        api.notification.setUserSetting(data).then((response)=>{
            idRef.current = response.data.data[0].id;
        }).catch((error)=>{

        });
    }

    useEffect(()=>{
        api.notification.fetchUserSetting(user?.id).then((response)=>{
            idRef.current = response.data.data[0].id;
            createdRef.current.checked = response.data.data[0].attributes.created;
            updatedRef.current.checked = response.data.data[0].attributes.updated;
            deletedRef.current.checked = response.data.data[0].attributes.deleted;
            mentionedRef.current.checked = response.data.data[0].attributes.mentioned;
        }).catch((error)=>{

        });
    }, []);
    
    return(
        <div onChange={saveSetting} className="page text-nowrap user-select-none">
            <div className="border-bottom p-2 fw-bold">Notification Settings</div>
            <div className="my-4">
                <button onClick={()=>navigate(routes.settings().nested().emailNotificationSetup())} className="btn btn-sm btn-info">Setup Notification settings</button>
            </div>
            <div hidden={false}>
                <div className="my-2">Send me a notification when:</div>
                <ul className="list-group">
                    <li className="small list-group-item">
                        <label className="d-flex align-items-center pointer">
                            <input ref={createdRef} className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                            <div>A new record is created</div>
                        </label>
                    </li>
                
                    <li className="small list-group-item">
                        <label className="d-flex align-items-center pointer">
                            <input ref={updatedRef} className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                            <div>A record has been updated</div>
                        </label>
                    </li>
                    <li className="small list-group-item">
                        <label className="d-flex align-items-center pointer">
                            <input ref={deletedRef} className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
                            <div>A record is deleted or deactivated</div>
                        </label>
                    </li>
                    <li className="small list-group-item">
                        <label className="d-flex align-items-center pointer">
                            <input ref={mentionedRef} className="form-check-input bg-info bg-lightgray p-2 me-2" type="checkbox"/>
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
        </div>
    )
}