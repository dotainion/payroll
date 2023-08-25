import React, { useEffect, useRef } from "react";
import { FaAddressCard, FaBusinessTime, FaCity } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import $ from 'jquery';
import { useAdmin } from "../layout/BusinessLayout";

export const Profile = () =>{
    const { data, addData } = useAdmin();

    const navigate = useNavigate();
    const location = useLocation();

    const nameRef = useRef();
    const countryRef = useRef();
    const cityRef = useRef();
    const addressRef = useRef();

    const onNext = () =>{
        $(nameRef.current).parent().removeClass('border-danger');
        $(countryRef.current).parent().removeClass('border-danger');
        $(cityRef.current).parent().removeClass('border-danger');
        $(addressRef.current).parent().removeClass('border-danger');
        if(!nameRef.current.value) return $(nameRef.current).parent().addClass('border-danger');
        if(!countryRef.current.value) return $(countryRef.current).parent().addClass('border-danger');
        if(!cityRef.current.value) return $(cityRef.current).parent().addClass('border-danger');
        if(!addressRef.current.value) return $(addressRef.current).parent().addClass('border-danger');
        addData({
            name: nameRef.current.value,
            country: countryRef.current.value, 
            city: cityRef.current.value,
            address: addressRef.current.value
        });
        navigate(routes.business().credentials());
    }

    useEffect(()=>{
        if(![true, false].includes(data?.isOrganization)) navigate(routes.business().aboutYou());
    }, [location]);

    return(
        <div className="mobile-inputes shadow-sm border rounded bg-white p-4">
            <div className="text-center p-2 fw-bold fs-3" data-title="">admin</div>
            <label className="mt-3">Business Name:</label>
            <div className="input-group">
                <span className="input-group-text"><FaBusinessTime/></span>
                <input ref={nameRef} className="form-control shadow-none" placeholder="Business" defaultValue={data?.name}/>
            </div>
            <label className="mt-3">Country:</label>
            <div className="input-group">
                <span className="input-group-text"><GiIsland/></span>
                <select ref={countryRef} className="form-control shadow-none" defaultValue={data?.country}>
                    <option>Grenada</option>
                </select>
            </div>
            <label className="mt-3">City:</label>
            <div className="input-group">
                <span className="input-group-text"><FaCity/></span>
                <select ref={cityRef} className="form-control shadow-none" defaultValue={data?.city}>
                    <option>Saint Andrew</option>
                    <option>Saint David</option>
                    <option>Saint George</option>
                    <option>Saint John</option>
                    <option>Saint Mark</option>
                    <option>Saint Patrick</option>
                    <option>Carriacou</option>
                    <option>Petite Martinique</option>
                    <option hidden value={''}>Select a city</option>
                </select>
            </div>
            <label className="mt-3">Address:</label>
            <div className="input-group">
                <span className="input-group-text"><FaAddressCard/></span>
                <input ref={addressRef} className="form-control shadow-none" placeholder="Address" defaultValue={data?.address}/>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4" data-btn-container="">
                <button onClick={()=>navigate(routes.business().aboutYou())} className="btn btn-sm btn-primary me-2">Previous</button>
                <button onClick={onNext} className="btn btn-sm btn-primary px-3">Next</button>
            </div>
        </div>
    )
}