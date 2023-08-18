import React, { useEffect, useRef, useState } from "react";
import logo from '../images/logo.png';
import { useNavigate, useParams} from 'react-router-dom';
import { routes } from "../router/routes";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";

export const AssignPassword = () =>{
    const [user, setUser] = useState();
    const [invalid, setInvalid] = useState();

    const navigate = useNavigate();
    const params = useParams();

    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const onSave = () =>{
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return toast.error('Credential', 'Password mismatch.');
        }
        const data = {
            id: user?.id || '',
            password: passwordRef.current?.value || '',
            refreshToken: params?.refreshToken || ''
        }
        api.user.updateCredentialByRefreshToken(data).then((response)=>{
            navigate(routes.signin());
        }).catch((error)=>{
            toast.error('Credentials', error);
        });
    }

    useEffect(()=>{
        api.user.fetchHasCredentialByRefreshToken(params?.refreshToken).then((response)=>{
            response.data.data.forEach((o)=>{
                if(o.type === 'user') setUser(o);
            });
        }).catch((error)=>{
            setInvalid(true);
        });
    }, []);

    return(
        <form onSubmit={(e)=>e.preventDefault()} className="signin-page">
            {
                !invalid?
                <div className="signin">
                    <div className="signin-logo">
                        <img src={logo} alt="" />
                    </div>
                    {
                        user? 
                        <div className="signin-inputs-container">
                            <p className="h4 pb-2 text-center">Add Credentials</p>
                            <div>Create a strong password that will be associated with <span>{user?.attributes?.email}</span></div>
                            <input ref={passwordRef} className="form-control" placeholder="Password" type="password" required/>
                            <input ref={confirmPasswordRef} className="form-control" placeholder="Confirm Password" type="password" required/>
                            <button onClick={onSave} className="btn btn-primary rounded-0 mt-3 w-100">Save</button>
                        </div>:
                        <div className="text-center mt-5">
                            <div className="spinner-border text-primary"></div>
                        </div>
                    }
                </div>:
                <div className="text-center w-100">
                    <div className="bg-danger text-white fs-3 fw-bold p-3">This link is no longer valid</div>
                </div>
            }
        </form>
    )
}