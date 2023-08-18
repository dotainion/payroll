import React, { createContext, useContext, useState } from "react";
import { BsDash } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useOverlay } from "../overlay/OverlayProvider";

export const PageTaskbar = ({tite, children}) =>{
    const { overlayList, setOverlay, overlay } = useOverlay();

    const onToggle = (content) =>{
        if(overlay) setOverlay('');
        else setOverlay(content);
    }

    return(
        <div onClick={()=>setOverlay('')} className="backdrop">
            <div onClick={(e)=>e.stopPropagation()} className="page">
                {children}
            </div>
            {
                overlayList.length ?
                <div onClick={(e)=>e.stopPropagation()} className="footer bg-light d-flex justify-content-end p-1">
                    {overlayList.map((content, key)=>(
                        <button 
                            onClick={()=>onToggle(content)}
                            className={`ms-1 btn btn-dark rounded-0 p-1 ${content === overlay ? 'text-success' : ''}`}
                            key={key}>
                            <span>{content}</span>
                        </button>
                    ))}
                </div>: null
            }
        </div>
    )
}