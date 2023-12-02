import React, { useEffect, useRef } from "react";
import $ from 'jquery';

export const Loading = ({show, text}) =>{
    const loaderRef = useRef();

    useEffect(()=>{
        if(show) $(loaderRef.current).show('fast');
        else $(loaderRef.current).hide('fast');
    }, [show]);
    
    return(
        <div ref={loaderRef} style={{display: 'none'}}>
            <div className="position-absolute translate-middle bg-dark opacity-25 top-50 start-50 w-100 h-100"/>
            <div className="position-absolute translate-middle top-50 start-50" style={{zIndex: '9999'}}>
                <div className="text-center">
                    <div className="spinner-border text-primary"/>
                </div>
                <div>{text}</div>
            </div>
        </div>
    )
}