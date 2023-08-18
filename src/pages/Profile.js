import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';

export const Profile = () =>{
    const [list, setList] = useState([]);

    useEffect(()=>{
        
    }, []);
    return(
        <div className="page profile text-nowrap">
            <div className="border-bottom p-2 fw-bold">Update profile settings</div>
            
        </div>
    )
}