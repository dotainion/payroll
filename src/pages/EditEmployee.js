import React from "react";
import { Employee } from "../components/Employee";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../router/routes";

export const EditEmployee = () =>{
    const navigate = useNavigate();
    
    const onEdit = (data) =>{
        api.user.edit(data).then((response)=>{
            toast.success( response?.data?.data[0]?.attributes?.name, 'Updated');
            navigate(routes.workspace().nested().employees());
        }).catch((error)=>{
            toast.error('Employee', error);
        });
    }

    return(
        <Employee onSubmit={onEdit} title={<Header/>} buttonTitle={'Update'}/>
    )
}

const Header = () =>{
    const params = useParams();
    const navigate = useNavigate();

    return(
        <div className="d-flex">
            <div>Edit Employee</div>
            <div className="ms-3">
                <button 
                    onClick={()=>navigate(routes.workspace().nested().employeeSettings(params?.userId))} 
                    className="btn btn-sm btn-outline-primary px-3">Banks and more...</button>
            </div>
        </div>
    )
}
