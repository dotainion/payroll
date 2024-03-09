import React from "react";
import { Employee } from "../components/Employee";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { BankGenerator } from "../widgets/BankGenerator";
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { useDocument } from "../contents/DocumentProvider";
import { BsPersonFillAdd } from "react-icons/bs";
import { PiBankBold } from "react-icons/pi";
import { IoPeopleSharp } from "react-icons/io5";

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
        <div className="bg-white">
            <div className="employee-header px-5">
                <div>
                    <button onClick={()=>navigate(routes.workspace().nested().employees())} className="btn mx-2 small">
                        <IoPeopleSharp className="text-dark p-2 fs-1 rounded-circle bg-light"/>
                        <div className="small text-light"><small><small>View employee list</small></small></div>
                    </button>
                </div>
            </div>
            <Employee onSubmit={onCreate} title="Create Employee Account">
                <BankGenerator disableApiRequest />
            </Employee>
        </div>
    )
}