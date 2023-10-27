import React from "react";
import { Employee } from "../components/Employee";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { BankGenerator } from "../widgets/BankGenerator";
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { useDocument } from "../contents/DocumentProvider";

export const CreateEmployee = () =>{
    const { setLoading } = useDocument();

    const navigate = useNavigate();
    
    const onCreate = (data) =>{
        setLoading(true);
        api.user.create(data).then((response)=>{
            toast.success(response?.data?.data[0]?.attributes?.name, 'Created');
            navigate(routes.workspace().nested().employees());
        }).catch((error)=>{
            toast.error('Employee', error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    return(
        <Employee onSubmit={onCreate} title="Create Employee" buttonTitle={'Create'}>
            <BankGenerator disableApiRequest />
        </Employee>
    )
}