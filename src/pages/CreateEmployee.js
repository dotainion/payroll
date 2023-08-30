import React from "react";
import { Employee } from "../components/Employee";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { BankGenerator } from "../widgets/BankGenerator";

export const CreateEmployee = () =>{
    const onCreate = (data) =>{
        console.log(data);
        api.user.create(data).then((response)=>{
            toast.success(response?.data?.data[0]?.attributes?.name, 'Created');
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