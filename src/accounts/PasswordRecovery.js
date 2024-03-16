import React, { useRef } from "react";
import logo from '../images/logo.png';
import { useNavigate} from 'react-router-dom';
import { routes } from "../router/routes";
import { api } from "../request/Api";
import { ErrorResponseHandler } from "../utils/ErrorResponseHandler";
import $ from 'jquery';
import { toast } from "../utils/Toast";

export const PasswrodRecovery = () =>{
    const navigate = useNavigate();

    const emailRef = useRef();
    const errorRef = useRef();

    const onRecovery = (e) =>{
        e.preventDefault();
        $(errorRef.current).hide();
        api.auth.recoverAccount(emailRef.current.value).then((response)=>{
            toast.success('Recovery', 'Email sent, visit your email for instructions.');
        }).catch((error)=>{
            $(errorRef.current).text(new ErrorResponseHandler().message(error)).show();
        });
    }

    return(
        <form className="signin-page" onSubmit={onRecovery}>
            <div className="signin">
                <div className="signin-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="signin-inputs-container">
                    <p className="h4 pb-2 text-center">Reset account password</p>
                    <div className="small">Enter the email address you added to your account and a email with information to reset your account will be send to you.</div>
                    <div ref={errorRef} className="text-danger my-2" style={{display: 'none'}}></div>
                    <div>Email<span className="text-danger ms-1">*</span></div>
                    <input ref={emailRef} className="form-control mt-1" placeholder="example@example.com" type="email" required/>
                    <div className="d-none text-danger small">This value is required.</div>
                    <button className="btn btn-primary rounded-0 mt-3 w-100" type="submit">Reset Password</button>
                    <button onClick={()=>navigate(routes.signin())} className="btn btn-dark rounded-0 mt-3 w-100" type="button">Cancel</button>
                </div>
            </div>
        </form>
    )
}