import React, { useEffect, useState } from "react";
import { api } from "../request/Api";
import { OvertimeSettings } from "./OvertimeSettings";

export const OvertimeContainer = () =>{
    const [settings, setSettings] = useState([]);

    const addNew = () =>{
        setSettings((ots)=>[...ots, null]);
    }

    useEffect(()=>{
        api.overtime.listOTSettings().then((response)=>{
            console.log(response.data.data);
            setSettings(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div>
            <ul className="list-group mt-4">
                <li className="list-group-item bg-light">
                    <div className="fw-bold">Overtime settings</div>
                </li>
            </ul>
            <p className="text-center">Create formular to determine the cost of overtime by input<br/> number or select a placeholder to automatically add value.</p>
            {settings.map((ot, key)=>(
                <OvertimeSettings settings={ot} key={key} />
            ))}
            <button onClick={addNew} className="btn btn-primary btn-sm mt-2">Add new +</button>
        </div>
    )
}