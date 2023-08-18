import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsDash } from "react-icons/bs";
import $ from 'jquery';
import { useOverlay } from "../overlay/OverlayProvider";

export const PageTaskbarRoute = ({tite, path, element}) =>{
    const { overlay, setOverlay, setOverlayList } = useOverlay();

    const pageRef = useRef();

    const onMinimize = () =>{
        setOverlay('');
    }

    const onClose = () =>{
        setOverlayList((o)=>[...o.filter((l)=>l!== overlay)]);
        setOverlay('');
    }

    useEffect(()=>{
        if(path === overlay) $(pageRef.current).show('fast');
        else $(pageRef.current).hide('fast');
    }, [path, overlay]);
    return(
        <div ref={pageRef} style={{height: '100vh', display: 'none'}}>
            <div className="d-flex align-items-center header bg-dark text-light text-nowrap p-1">
                <div className="w-100 px-3">{tite}</div>
                <button onClick={onMinimize} className="btn btn-sm btn-dark rounded-0 p-1">
                    <BsDash className="fs-4"/>
                </button>
                <button onClick={onClose} className="btn btn-sm btn-dark rounded-0 p-1">
                    <AiOutlineClose className="fs-4"/>
                </button>
            </div>
            {element}
        </div>
    )
}