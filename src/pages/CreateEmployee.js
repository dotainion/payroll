import React from "react";
import { Employee } from "../components/Employee";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { BankGenerator } from "../widgets/BankGenerator";
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";

export const CreateEmployee = () =>{
    const navigate = useNavigate();
    
    const onCreate = (data) =>{
        console.log(data);
        api.user.create(data).then((response)=>{
            toast.success(response?.data?.data[0]?.attributes?.name, 'Created');
            navigate(routes.workspace().nested().employees());
        }).catch((error)=>{
            toast.error('Employee', error);
        });
    }

    return(
        <Employee onSubmit={onCreate} title="Create Employee" buttonTitle={'Create'}>
            <BankGenerator disableApiRequest />
        </Employee>
    )
}