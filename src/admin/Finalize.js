import React, { useEffect } from "react";
import { routes } from "../router/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../layout/BusinessLayout";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { Profile } from "./Profile";
import { Credentials } from "./Credentials";
import { FcBusinesswoman } from 'react-icons/fc';
import { GiPlantSeed } from "react-icons/gi";

export const Finalize = () =>{
    const { data } = useAdmin();

    const navigate = useNavigate();
    const location = useLocation();

    const onFinalize = () =>{
        api.admin.registerBusiness(data).then((response)=>{
            window.location.reload();
        }).catch((error)=>{
            toast.error('Business Account', error);
        });
    }

    useEffect(()=>{
        if(!data?.password) navigate(routes.business().credentials());
    }, [location]);

    return(
        <div className="finalize-admin shadow-sm border rounded bg-white p-4">
            <div className="text-center p-2 fw-bold fs-3">Finalize</div>
            <div className="position-relative">
                <div className="d-flex align-items-center mb-4">
                    <div className="me-3 text-nowrap">
                        <div hidden className="border bg-muted text-center pe-none btn m-2 p-0">
                            <FcBusinesswoman className=" my-2" style={{fontSize: '100px'}}/>
                            <div className="px-4 py-2 bg-lightgray text-muted">I'm an Individual</div>
                        </div>
                        <div className="border text-center pointer btn btn-light m-2 p-0">
                            <GiPlantSeed className="text-success my-2" style={{fontSize: '100px'}}/>
                            <div className="px-4 py-2 bg-lightgray">Business Account</div>
                        </div>
                    </div>
                    <div className="w-100">
                        <Credentials/>
                    </div>
                </div>
                <Profile/>
                <div className="position-absolute top-0 start-0 w-100 h-100"></div>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4">
                <button onClick={()=>navigate(routes.business().credentials())} className="btn btn-sm btn-primary me-2">Previous</button>
                <button onClick={onFinalize} className="btn btn-sm btn-success px-3">Finalize</button>
            </div>
        </div>
    )
}