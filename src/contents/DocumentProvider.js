import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { api } from "../request/Api";
import { useAuth } from "../auth/AuthProvider";
import { LoadingSpinner } from "../other/LoadingSpinner";

const Context = createContext();
export const useDocument = () => useContext(Context);

export const DocumentProvider = ({children}) =>{
    const { isAuthenticated } = useAuth();
    
    const [loading, setLoading] = useState(false);
    const [costTypes, setCostTypes] = useState();
    const [rateTypes, setRateTypes] = useState();
    const [previousHistory, setPreviousHistory] = useState([]);
    const [allowanceDeductionIdLinks, setAllowanceDeductionIdLinks] = useState();

    const timeoutRef = useRef();

    const addPreviousHistory = (data) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if(!previousHistory.find((h)=>h?.id === data?.id)){
                data.time = new Date().toLocaleTimeString();
                setPreviousHistory((hist)=>[data, ...hist]);
            }
        }, 100);
        return data?.action;
    }

    useEffect(()=>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.document.costTypes().then((response)=>{
                setCostTypes(response.data.data[0].attributes);
            }).catch((error)=>{
                console.log(error);
            });

            api.document.rateTypes().then((response)=>{
                setRateTypes(response.data.data[0].attributes);
            }).catch((error)=>{
                console.log(error);
            });

            api.document.allowanceDeductionIdLink().then((response)=>{
                setAllowanceDeductionIdLinks(response.data.data[0].attributes);
            }).catch((error)=>{
                console.log(error);
            });
        }, 100);
    }, [isAuthenticated]);

    const value = {
        costTypes,
        rateTypes,
        previousHistory,
        addPreviousHistory,
        loading,
        setLoading,
        allowanceDeductionIdLinks,
    }

    return(
        <Context.Provider value={value}>
            <LoadingSpinner isActive={loading}/>
            {children}
        </Context.Provider>
    )
}