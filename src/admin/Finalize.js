import React, { useEffect } from "react";
import { routes } from "../router/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { GiFinishLine } from "react-icons/gi";
import { useAdmin } from "../layout/BusinessLayout";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";

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
        <div>
            <div className="text-center p-2 fw-bold fs-3">Finalize</div>
            <div className="m-3 text-center text-success">
                <div className="d-inline-block border border-5 border-success rounded-circle p-4">
                    <GiFinishLine style={{fontSize: '80px'}}/>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4">
                <button onClick={()=>navigate(routes.business().credentials())} className="btn btn-sm btn-primary me-2">Previous</button>
                <button onClick={onFinalize} className="btn btn-sm btn-success px-3">Finalize</button>
            </div>
        </div>
    )
}