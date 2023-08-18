import React from "react";
import { useRef } from "react";
import $ from 'jquery';
import { useEffect } from "react";

export const Tooltip = ({title, children}) =>{
    const tooltipRef = useRef();
    const overlayRef = useRef();
    const timeoutRef = useRef();

    const onHover = () =>{
        $(overlayRef.current).show();
    }

    useEffect(()=>{
        $(tooltipRef.current).hover(()=>{
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                $(overlayRef.current).show();
            }, 500);
        }, ()=>{
            clearTimeout(timeoutRef.current);
            $(overlayRef.current).hide();
        }).click(()=>{
            clearTimeout(timeoutRef.current);
            $(overlayRef.current).hide();
        });
    }, []);

    return(
        <div ref={tooltipRef} className="custom-tooltip">
            {children}
            <div className="position-relative user-select-none">
                <div ref={overlayRef} className="custom-tooltip-overlay">
                    {title}
                </div>
            </div>
        </div>
    )
}
