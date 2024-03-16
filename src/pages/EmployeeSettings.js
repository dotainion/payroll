import React, { useEffect, useRef, useState } from "react";
import { BankGenerator } from "../widgets/BankGenerator";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { BsFillShieldLockFill } from "react-icons/bs";
import $ from 'jquery';
import { payload } from "../utils/AddonsPayload";
import { toast } from "../utils/Toast";

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
                {
                    !loading &&
                    <div>
                        {
                            hasCredential ?
                            <ul className="list-group">
                                <li className="small list-group-item">You cannot modify user password, please note that password recovery can be done by the login screen and should meet the minimal password strength requirements.</li>
                                <li className="small list-group-item">Password must be at least 7 digits, contain a capital letter, number (0-9) and a special character</li>
                            </ul>  
                            :
                            <ul className="list-group">
                                <li className="small list-group-item">You can add credentials to this user only once.</li>
                                <li className="small list-group-item">You cannot change password when submited.</li>
                                <li className="small list-group-item">You can only remove credential from this user which will restrict user access.</li>
                                <li className="small list-group-item">Please note that your new password should meet the minimal password strength requirements.</li>
                                <li className="small list-group-item">Password must be at least 7 digits, contain a capital letter, number (0-9) and a special character</li>
                                <div className="my-2">
                                    <button onClick={onAssignUserCredential} className="btn btn-sm btn-outline-primary">Assign credentials to this user</button>
                                </div>
                            </ul>
                        }
                    </div>  
                }  
            </div>
            <div className="mobile-inputes bg-light p-3 rounded-3 my-2">
                <BankGenerator existingBanks={existingBanks}/>
            </div>
        </div>
    )
}