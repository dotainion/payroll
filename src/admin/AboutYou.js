import React from "react";
import { GiPlantSeed } from "react-icons/gi";
import { FcBusinesswoman } from 'react-icons/fc';
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { useAdmin } from "../layout/BusinessLayout";

export const AboutYou = () =>{
    const { data, addData } = useAdmin();

    const navigate = useNavigate();

    const onBusiness = () =>{
        addData({
            isOrganization: true
        });
        navigate(routes.business().profile());
    }

    return(
        <div>
            <div className="text-center p-2 fw-bold fs-3">About You</div>
            <div className="d-flex justify-content-center">
                <div className="border bg-muted text-center pe-none btn m-2 p-0">
                    <FcBusinesswoman className=" my-2" style={{fontSize: '100px'}}/>
                    <div className="px-4 py-2 bg-lightgray text-muted">I'm an Individual</div>
                </div>
                <div onClick={onBusiness} className="border text-center pointer btn btn-light m-2 p-0">
                    <GiPlantSeed className="text-success my-2" style={{fontSize: '100px'}}/>
                    <div className="px-4 py-2 bg-lightgray">Business Account</div>
                </div>
            </div>
        </div>
    )
}