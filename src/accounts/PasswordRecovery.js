import React, { useRef } from "react";
import logo from '../images/logo.png';
import { useNavigate} from 'react-router-dom';
import { routes } from "../router/routes";
import { api } from "../request/Api";

export const PasswrodRecovery = () =>{
    const navigate = useNavigate();

    const emailRef = useRef();
    const errorRef = useRef();

    const onRecovery = () =>{
        api.auth.recoverAccount().then((response)=>{

        }).catch((error)=>{

        });
    }

    return(
        <form className="signin-page">
            <div className="signin">
                <div className="signin-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="signin-inputs-container">
                    <p className="h4 pb-2 text-center">Reset account password</p>
                    <div className="small">Enter the email address you added to your account and a email with information to reset your account will be send to you.</div>
                    <div ref={errorRef} className="alert alert-danger" style={{display: 'none'}}></div>
                    <div>Email<span className="text-danger ms-1">*</span></div>
                    <input ref={emailRef} className="form-control mt-1" placeholder="example@example.com" type="email" required/>
                    <div className="d-none text-danger small">This value is required.</div>
                    <button onClick={onRecovery} className="btn btn-primary rounded-0 mt-3 w-100">Reset Password</button>
                    <button onClick={()=>navigate(routes.signin())} className="btn btn-dark rounded-0 mt-3 w-100">Cancel</button>
                </div>
            </div>
        </form>
    )
}