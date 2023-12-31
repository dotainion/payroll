import React, { useRef } from "react";
import logo from '../images/logo.png';
import { useNavigate} from 'react-router-dom';
import { routes } from "../router/routes";
import { useAuth } from "../auth/AuthProvider";

export const Signin = () =>{
    const { signin } = useAuth();

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSignIn = () =>{
        signin(emailRef.current.value, passwordRef.current.value);
    }

    return(
        <form onSubmit={(e)=>e.preventDefault()} className="signin-page">
            <div className="signin">
                <div className="signin-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="signin-inputs-container">
                    <p className="h4 pb-2 text-center">Sign In</p>
                    <input ref={emailRef} className="form-control" placeholder="Email" type="email" required/>
                    <input ref={passwordRef} className="form-control" placeholder="Password" type="password" required/>
                    <span onClick={()=>navigate(routes.passRecovery())} className="text-decoration-underline link-primary pointer">Forgot password?</span>
                    <button onClick={onSignIn} className="btn btn-primary rounded-0 mt-3 w-100">Sign in</button>
                </div>
            </div>
        </form>
    )
}