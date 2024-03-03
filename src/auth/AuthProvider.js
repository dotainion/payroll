import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { api } from "../request/Api";
import { token } from "../utils/Token";
import { StartupPage } from "../other/StartupPage";
import { FaDoorClosed } from "react-icons/fa";
import { toast } from "../utils/Toast";
import { NotAuthenticated } from "../other/NotAuthenticated";
import { ChangeCredential } from '../utils/ChangeCredential';
import { ErrorResponseHandler } from "../utils/ErrorResponseHandler";

const Context = createContext();
export const useAuth = () => useContext(Context);

const creds = new ChangeCredential();
export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState();
    const [business, setBusiness] = useState(true);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const timeoutRef = useRef();
    const authStateChangeRef = useRef([]);

    const signin = useCallback((email, password) =>{
        api.auth.signin(email, password).then((response)=>{
            setUser(response.data.data[0]);
            setErrorMessage(null);
            setIsAuthenticated(true);
            authStateChangeRef.current.forEach((api)=>api?.success?.(response.data.data[0]));
            token.set(response.data.data[0].attributes.token);
        }).catch((err)=>{
            setErrorMessage(new ErrorResponseHandler().message(err));
            authStateChangeRef.current.forEach((api)=>api?.error?.(err));
            console.log('Unable to sign in at this time.');
            toast.error('Sign In', err);
        });
    });

    const signout = useCallback(() =>{
        api.auth.logout().then(()=>{
            setUser(null);
            setIsAuthenticated(false);
        }).catch((error)=>{
            toast.error('Authentication', error);
        });
    });

    const changePassord = useCallback((currentPass, newPass) =>{
        api.auth.changePassword(user?.id, currentPass, newPass).then(()=>{
            creds.close();
            toast.success('Authentication', 'Passwrod change.');
        }).catch((error)=>{
            toast.error('Authentication', error);
        });
    });

    const updateBusiness = useCallback((data) =>{
        api.admin.editBusiness(data).then((response)=>{
            setBusiness(response.data.data[0]);
        }).catch((error)=>{
            toast.error('Business', error);
        });
    });

    const onAuthStateChange = useCallback((success, error) =>{
        const id = new Date().getTime();
        authStateChangeRef.current.push({
            success: success, 
            error: error,
            id: id
        });
        return () => {
            authStateChangeRef.current = authStateChangeRef.current.filter((o)=>o.id !== id);
        };
    });

    useEffect(()=>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.admin.fetchBusiness().then((response)=>{
                if(!response.data.data.length) return;
                setBusiness(response.data.data[0]);
            }).catch(()=>{

            }).finally(()=>{
                api.session.getSession().then((response)=>{
                    setUser(response.data.data[0]);
                    setIsAuthenticated(true);
                }).catch((error)=>{
                    console.log(error);
                }).finally(()=>{
                    setLoading(false);
                });
            })
        }, 100);
    }, []);

    const value = {
        user,
        business,
        isAuthenticated,
        signout,
        signin,
        changePassord,
        updateBusiness,
        onAuthStateChange,
        errorMessage
    }

    return(
        <Context.Provider value={value}>
            <NotAuthenticated/>
            {loading ? <StartupPage/> : children}
        </Context.Provider>
    )
}