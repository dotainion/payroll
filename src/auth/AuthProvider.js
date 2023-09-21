import React, { useEffect, useRef } from "react";
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

const Context = createContext();
export const useAuth = () => useContext(Context);

const creds = new ChangeCredential();
export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState();
    const [business, setBusiness] = useState();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState();

    const timeoutRef = useRef();

    const signin = async(email, password, successCallback, errorCallback) =>{
        const success = successCallback;
        const error = errorCallback;
        await api.auth.signin(email, password).then((response)=>{
            setUser(response.data.data[0]);
            setIsAuthenticated(true);
            success?.(response.data.data[0]);
            token.set(response.data.data[0].attributes.token);
        }).catch((err)=>{
            error?.(err);
            console.log('Unable to sign in at this time.');
            toast.error('Sign In', err);
        });
    }

    const signout = () =>{
        api.auth.logout().then(()=>{
            setUser(null);
            setIsAuthenticated(false);
        }).catch((error)=>{
            toast.error('Authentication', error);
        });
    }

    const changePassord = (currentPass, newPass) =>{
        api.auth.changePassword(user?.id, currentPass, newPass).then(()=>{
            creds.close();
            toast.success('Authentication', 'Passwrod change.');
        }).catch((error)=>{
            toast.error('Authentication', error);
        });
    }

    const updateBusiness = (data) =>{
        api.admin.editBusiness(data).then((response)=>{
            setBusiness(response.data.data[0]);
        }).catch((error)=>{
            toast.error('Business', error);
        });
    }

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
        updateBusiness
    }

    return(
        <Context.Provider value={value}>
            <NotAuthenticated/>
            {loading ? <StartupPage/> : children}
        </Context.Provider>
    )
}