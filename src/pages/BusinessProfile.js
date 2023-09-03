import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GiIsland } from "react-icons/gi";
import { FaAddressCard, FaBusinessTime, FaCity } from "react-icons/fa";
import { useDocument } from "../contents/DocumentProvider";
import { useAuth } from "../auth/AuthProvider";
import $ from 'jquery';
import { api } from "../request/Api";

export const BusinessProfile = () =>{
    const { business, updateBusiness } = useAuth();

    const emailRef = useRef();
    const nameRef = useRef();
    const countryRef = useRef();
    const cityRef = useRef();
    const addressRef = useRef();
    const isOrganizationRef = useRef();

    const timeoutRef = useRef();
    const organizationToggleMessageRef = useRef();

    const onEdit = () =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const data = {
                id: business?.id,
                name: nameRef.current.value,
                email: emailRef.current.value,
                city: cityRef.current.value,
                country: countryRef.current.value,
                address: addressRef.current.value,
                isOrganization: isOrganizationRef.current.checked,
            };
            console.log(data);
            updateBusiness(data);
        }, 500);
    }

    const onOrganizationChange = (e) =>{
        return;
        if(e.target.checked) $(organizationToggleMessageRef.current).text('Organization');
        else $(organizationToggleMessageRef.current).text('Individual');
    }

    useEffect(()=>{
        if(!business) return;
        emailRef.current.value = business?.attributes?.email;
        nameRef.current.value = business?.attributes?.name;
        addressRef.current.value = business?.attributes?.address;
        isOrganizationRef.current.checked = business?.attributes?.isOrganization;
    }, [business]);

    return(
        <div onChange={onEdit} className="page profile text-nowrap">
            <div className="border-bottom p-2 fw-bold">Update Business Profile</div>
            <div className="mobile-inputes">
                <label className="form-check form-switch mt-3">
                    <input ref={isOrganizationRef} onChange={onOrganizationChange} className="form-check-input" type="checkbox" checked={true}/>
                    <span ref={organizationToggleMessageRef} className="form-check-label">Organization</span>
                </label>
                <label className="mt-3">Email:</label>
                <div className="input-group">
                    <span className="input-group-text"><FaBusinessTime/></span>
                    <input ref={emailRef} className="form-control shadow-none" placeholder="example@example.com"/>
                </div>
                <label className="mt-3">Business Name:</label>
                <div className="input-group">
                    <span className="input-group-text"><FaBusinessTime/></span>
                    <input ref={nameRef} className="form-control shadow-none" placeholder="Business"/>
                </div>
                <label className="mt-3">Country:</label>
                <div className="input-group">
                    <span className="input-group-text"><GiIsland/></span>
                    <select ref={countryRef} className="form-control shadow-none" defaultValue={business?.attributes?.city}>
                        <option>Grenada</option>
                    </select>
                </div>
                <label className="mt-3">City:</label>
                <div className="input-group">
                    <span className="input-group-text"><FaCity/></span>
                    <select ref={cityRef} className="form-control shadow-none" defaultValue={business?.attributes?.city}>
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
                    <input ref={addressRef} className="form-control shadow-none" placeholder="Address"/>
                </div>
            </div>
        </div>
    )
}