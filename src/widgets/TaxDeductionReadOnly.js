import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';

export const TaxDeductionReadOnly = ({data}) =>{

    useEffect(()=>{
        
    }, []);

    if(!data) return null;

    return(
        <div className="px-3 mt-2 bg-lightergray py-3">
            <div className="fw-bold">Tax Deduction</div>
            <div className="text-muted mb-2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate</div>
            <div className="d-block bg-white p-3 text-primary">
                <div className="d-inline-block rounded-2 py-3 px-5 text-center user-select-none shadow-sm bg-primary text-white">
                    <div>Amount: <b>${data?.attributes?.amount}</b></div>
                    <div>Tax Number: <b>{data?.attributes?.number}</b></div>
                </div>
            </div>
        </div>
    )
}



