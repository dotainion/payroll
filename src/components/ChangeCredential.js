import React, { useRef } from "react";
import { ChangeCredential as CredentialHandler } from '../utils/ChangeCredential'
import { useAuth } from "../auth/AuthProvider";

const creds = new CredentialHandler();
export const ChangeCredential = () =>{
    const { changePassord } = useAuth();

    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();

    const onChangeCredential = () =>{
        changePassord(currentPasswordRef.current.value, newPasswordRef.current.value);
    }

    return(
        <div onClick={creds.close} className="backdrop position-absolute top-0 start-0 w-100 vh-100" data-change-credential="" style={{zIndex: '9999', display: 'none'}}>
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <div onClick={(e)=>e.stopPropagation()} className="signin bg-white">
                    <div className="signin-inputs-container bg-white">
                        <p className="h4 pb-2 text-center">Change Credential</p>
                        <input ref={currentPasswordRef} className="form-control" placeholder="Current Password" type="password" required/>
                        <input ref={newPasswordRef} className="form-control" placeholder="New Password" type="password" required/>
                        <button onClick={onChangeCredential} className="btn btn-primary rounded-0 mt-3 w-100">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}