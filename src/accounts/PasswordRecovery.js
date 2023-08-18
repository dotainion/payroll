import React from "react";
import logo from '../images/logo.png';
import { useNavigate} from 'react-router-dom';
import { routes } from "../router/routes";

export const PasswrodRecovery = () =>{
    const navigate = useNavigate();

    const onRecovery = () =>{

    }

    return(
        <form className="signin-page">
            <div className="signin">
                <div className="signin-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="signin-inputs-container">
                    <p className="h4 pb-2 text-center">Reset account password</p>
                    <div>Email<span className="text-danger ms-1">*</span></div>
                    <input className="form-control mt-1" placeholder="Email" type="email" required/>
                    <div className="d-none text-danger small">This value is required.</div>
                    <div>New Password<span className="text-danger ms-1">*</span></div>
                    <input className="form-control mt-1" placeholder="Password" type="password" required/>
                    <div className="d-none text-danger small">This value is required.</div>
                    <button onClick={onRecovery} className="btn btn-primary rounded-0 mt-3 w-100">Reset Password</button>
                    <button onClick={()=>navigate(routes.signin())} className="btn btn-dark rounded-0 mt-3 w-100">Cancel</button>
                </div>
            </div>
        </form>
    )
}