import React from "react";
import { useRef } from "react";
import { HiPlusSm } from "react-icons/hi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import $ from 'jquery';
import { useEffect } from "react";
import { useState } from "react";

export const MenuOption = ({menu, hr}) =>{
    const [isUp, setIsUp] = useState(true);

    const buttonRef = useRef();
    const overlayRef = useRef();

    useEffect(()=>{
        if($(buttonRef.current).attr('listener-set') === 'active') return;
        $(buttonRef.current).click(()=>{
            if($(overlayRef.current).is(':hidden')){
                $(overlayRef.current).show('fast');
                return setIsUp(true);
            }
            setIsUp(false);
            $(overlayRef.current).hide('fast');
        }).attr('listener-set', 'active');
    }, []);
    
    return(
        <div className="text-nowrap border-bottom border-secondary pb-3">
            <button ref={buttonRef} className={`btn btn-dark text-start me-2 rounded-0 d-flex align-items-center w-100`}>
                <div className="w-100">{menu.title}</div>
                <RiArrowDownSLine className={isUp ? 'd-none' : ''}/>
                <RiArrowUpSLine className={isUp ? '' : 'd-none'}/>
            </button>
            <div ref={overlayRef} className="w-100 ps-4 pe-1 overlay">
                {menu.list.map((menu, key)=>(
                    <button 
                        onClick={menu.onClick} 
                        className={`btn btn-dark text-start rounded-0 d-flex align-items-center w-100 ${menu.active ? 'bg-primary' : ''}`}
                        key={key}
                    >
                        <div className="w-100 small me-2">{menu.title}</div>
                        <menu.icon/>
                    </button>
                ))}
            </div>
        </div>
    )
}