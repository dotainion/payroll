import React from "react";
import { Employee } from "../components/Employee";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../router/routes";
import { BsPersonFillAdd } from "react-icons/bs";
import { PiBankBold } from "react-icons/pi";
import { BiSolidReport } from "react-icons/bi";

export const EditEmployee = () =>{
    const params = useParams();
    const navigate = useNavigate();
    
    const onEdit = (data) =>{
        api.user.edit(data).then((response)=>{
            const employee = response.data.data[0];
            toast.success(employee.attributes.name, 'Updated');
            navigate(routes.workspace().nested().employeeSettings(employee.id));
        }).catch((error)=>{
            toast.error('Employee', error);
        });
    }

    return(
        <div className="bg-white">
            <div className="employee-header px-5">
                <div>
                    <button onClick={()=>navigate(routes.workspace().nested().createEmployee())} className="btn mx-2 small">
                        <BsPersonFillAdd className="text-dark p-2 fs-1 rounded-circle bg-light"/>
                        <div className="small text-light"><small><small>New employee</small></small></div>
                    </button>
                    <button onClick={()=>navigate(routes.workspace().nested().employeeSettings(params?.userId))} className="btn mx-2 small">
                        <PiBankBold className="text-dark p-2 fs-1 rounded-circle bg-light"/>
                        <div className="small text-light"><small><small>Banks and credential</small></small></div>
                    </button>
                    <button onClick={()=>navigate(routes.workspace().nested().createReport(params?.userId))} className="btn mx-2 small">
                        <BiSolidReport className="text-dark p-2 fs-1 rounded-circle bg-light"/>
                        <div className="small text-light"><small><small>Create report</small></small></div>
                    </button>
                </div>
            </div>
            <Employee onSubmit={onEdit} title={'Edit Employee Account'} buttonTitle={'Update'}/>
        </div>
    )
}


