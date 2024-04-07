import React, { useEffect, useState } from "react";
import { BankGenerator } from "../widgets/BankGenerator";
import { api } from "../request/Api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "../utils/Toast";
import { EmployeeSettingCard } from "../components/EmployeeSettingCard";
import { routes } from "../router/routes";
import { BsPersonFillAdd } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";

export const EmployeeSettings = () =>{
    const [loading, setLoading] = useState(true);
    const [hasCredential, setHasCredential] = useState();
    const [existingBanks, setExistingBanks] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

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
            <div className="employee-header px-5">
                <div>
                    <button onClick={()=>navigate(routes.workspace().nested().createEmployee())} className="btn mx-2 small">
                        <BsPersonFillAdd className="text-dark p-2 fs-1 rounded-circle bg-light"/>
                        <div className="small text-light"><small><small>New employee</small></small></div>
                    </button>
                    <button onClick={()=>navigate(routes.workspace().nested().createReport(params?.userId))} className="btn mx-2 small">
                        <BiSolidReport className="text-dark p-2 fs-1 rounded-circle bg-light"/>
                        <div className="small text-light"><small><small>Create report</small></small></div>
                    </button>
                </div>
            </div>
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