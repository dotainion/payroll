import React, { useEffect, useRef, useState } from "react";
import { BankGenerator } from "../widgets/BankGenerator";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { BsFillShieldLockFill } from "react-icons/bs";
import $ from 'jquery';
import { payload } from "../utils/AddonsPayload";
import { toast } from "../utils/Toast";
import { EmployeeSettingCard } from "../components/EmployeeSettingCard";

export const EmployeeSettings = () =>{
    const [loading, setLoading] = useState(true);
    const [hasCredential, setHasCredential] = useState();
    const [existingBanks, setExistingBanks] = useState([]);

    const params = useParams();

    const onAssignUserCredential = () =>{
        api.user.assignCredential(params?.userId).then((response)=>{
            setHasCredential(true);
        }).catch((error)=>{
            setHasCredential(false);
            toast.error('Credentials', error);
        });
    }

    useEffect(()=>{
        api.bank.listByUser(params?.userId).then((response)=>{
            setExistingBanks(response.data.data);
        }).catch((error)=>{

        });
        api.user.fetchHasCredential(params?.userId).then((response)=>{
            setHasCredential(true);
        }).catch((error)=>{
            setHasCredential(false);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <div className="container">
            <div className="bg-light p-3 rounded-3 my-2">
                <div>Password</div>
                {!loading && <EmployeeSettingCard hasCredential={hasCredential} onAssignClick={onAssignUserCredential} />}  
            </div>
            <div className="mobile-inputes bg-light p-3 rounded-3 my-2">
                <BankGenerator existingBanks={existingBanks}/>
            </div>
        </div>
    )
}