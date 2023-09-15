import React, { useEffect, useRef } from "react";
import { api } from "../request/Api";
import { PasswordInput } from "../widgets/PasswordInput";

export const EmailSetup = () =>{

    const idRef = useRef(null);
    const emailRef = useRef();
    const passwordRef = useRef();

    const saveCredential = () =>{
        const data = {
            id: idRef.current,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        api.notification.setSetup(data).then((response)=>{
            idRef.current = response?.data?.data[0]?.id;
        }).catch((error)=>{

        });
    }

    useEffect(()=>{
        api.notification.fetchSetup().then((response)=>{
            idRef.current = response?.data?.data[0]?.id;
            emailRef.current.value = response?.data?.data[0]?.attributes?.email
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="page text-nowrap user-select-none">
            <input ref={emailRef} className="form-control mb-3" placeholder="Email" type="email" required/>
            <PasswordInput ref={passwordRef} className="form-control" placeholder="Password"/>
            <div className="mt-3">
                <button onClick={saveCredential} className="btn btn-sm btn-primary px-4">Save</button>
            </div>
        </div>
    )
}