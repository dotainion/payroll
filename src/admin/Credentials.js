import React, { useEffect, useRef, useState } from "react";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordFill } from 'react-icons/ri';
import { routes } from "../router/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../layout/BusinessLayout";
import { PasswordValidation } from "../utils/PasswordValidation";
import $ from 'jquery';

export const Credentials = () =>{
    const { data, addData } = useAdmin();
    const [error, setError] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const errorRef = useRef();

    const onNext = () =>{
        const pass = new PasswordValidation();
        $(emailRef.current).parent().removeClass('border-danger');
        $(passwordRef.current).parent().removeClass('border-danger');
        $(confirmPasswordRef.current).parent().removeClass('border-danger');
        if(!emailRef.current.value) return $(emailRef.current).parent().addClass('border-danger');
        if(!pass.isValid(passwordRef.current.value)){
            $(errorRef.current).show('fast').text(pass.message());
            return $(passwordRef.current).parent().addClass('border-danger');
        }
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            $(errorRef.current).show('fast').text('Password mismatch.');
            return $(confirmPasswordRef.current).parent().addClass('border-danger');
        }
        addData({
            email: emailRef.current.value, 
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
        });
        navigate(routes.business().finalize());
    }

    useEffect(()=>{
        if(!data?.city) navigate(routes.business().profile());
    }, [location]);

    return(
        <div onKeyUp={()=>$(errorRef.current).hide('fast')} className="mobile-inputes shadow-sm border rounded bg-white p-4">
            <div className="text-center p-2 fw-bold fs-3" data-title="">Credentials</div>
            <div ref={errorRef} className="alert alert-danger" style={{display: 'none'}}>{error}</div>
            <label className="mt-3">Email:</label>
            <div className="input-group" data-credential-email="">
                <span className="input-group-text"><MdOutlineMailLock/></span>
                <input ref={emailRef} className="form-control shadow-none" placeholder="example@example.com" defaultValue={data?.email} type="email"/>
            </div>
            <div data-input-container="">
                <label className="mt-3">Password:</label>
                <div className="input-group">
                    <span className="input-group-text"><RiLockPasswordFill/></span>
                    <input ref={passwordRef} className="form-control shadow-none" placeholder="Password1234#" defaultValue={data?.password} type="password"/>
                </div>
                <label className="mt-3">Confirm Password:</label>
                <div className="input-group">
                    <span className="input-group-text"><RiLockPasswordFill/></span>
                    <input ref={confirmPasswordRef} className="form-control shadow-none" placeholder="Password1234#" defaultValue={data?.confirmPassword} type="password"/>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4" data-btn-container="">
                <button onClick={()=>navigate(routes.business().profile())} className="btn btn-sm btn-primary me-2">Previous</button>
                <button onClick={onNext} className="btn btn-sm btn-primary px-3">Next</button>
            </div>
        </div>
    )
}