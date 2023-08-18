import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { PublicRouter } from "./PublicRouter";
import { AuthRouter } from "./AuthRouter";
import { BusinessRouter } from "./BusinessRouter";

export const SwitchRouter = () =>{
    const { isAuthenticated, business } = useAuth();

    if(!business){
        return <BusinessRouter/>
    }
    if(isAuthenticated){
        return <AuthRouter/>
    }
    return <PublicRouter/>
}