import React, { useEffect, useState } from "react";
import { api } from "../request/Api";
import { TaxSetup } from "./TaxSetup";

export const TaxSetupContainer = () =>{
    const [taxes, setTaxes] = useState([]);

    const addNew = () =>{
        setTaxes((txes)=>[...txes, null]);
    }

    useEffect(()=>{
        api.tax.list().then((response)=>{
            setTaxes(response.data.data);
        }).catch((error)=>{
            
        });
    }, []);

    return(
        <div>
            <ul className="list-group mt-4">
                <li className="list-group-item bg-light">
                    <div className="fw-bold">Tax settings</div>
                </li>
            </ul>
            {taxes.map((data, key)=>(
                <TaxSetup data={data} key={key} />
            ))}
            <button onClick={addNew} className="btn btn-primary btn-sm mt-2">Add new +</button>
        </div>
    )
}