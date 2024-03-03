import React, { memo, useCallback, useEffect, useRef } from "react";
import { Signin } from "../accounts/Signin";
import $ from 'jquery';
import { useAuth } from "../auth/AuthProvider";

export const NotAuthenticated = memo(() =>{
    const { onAuthStateChange } = useAuth();

    const warningRef = useRef();
    const loginRef = useRef();

    const onShowLogin = useCallback(() =>{
        $(loginRef.current).show('fast');
        $(warningRef.current).hide('fast');
    });

    useEffect(()=>{
        const unSubscribe = onAuthStateChange(() =>{
            $('[data-re-authenticated]').hide('fast');
            $(loginRef.current).hide('fast');
            $(warningRef.current).show('fast');
            window.location.reload();
        }, (error) =>{
            
        });
        return ()=>unSubscribe();
    }, []);

    return(
        <div className="not-authenticted backdrop position-absolute top-0 start-0 vw-100 vh-100" data-re-authenticated="" style={{display: 'none'}}>
            <div ref={warningRef} className="position-absolute top-50 start-50 translate-middle text-end bg-light py-4 px-5 rounded-3 shadow-sm">
                <div className="fw-bold p-2 fs-5">You are not authnticated</div>
                <button onClick={onShowLogin} className="btn btn-sm btn-outline-primary px-3 py-1">Login</button>
            </div>
            <div ref={loginRef} style={{display: 'none'}}>
                <Signin />
            </div>
        </div>
    )
});