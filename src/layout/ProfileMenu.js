import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiAccountBoxFill } from "react-icons/ri";
import { Tooltip } from "../container/Tooltip";
import $ from 'jquery';
import { useEffect } from "react";
import { useRef } from "react";
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export const ProfileMenu = () =>{
    const { signout, user } = useAuth();
    const navigate = useNavigate();
    
    const overlayRef = useRef();
    const profileRef = useRef();

    useEffect(()=>{
        if($(profileRef.current).attr('listener-set') === 'active') return;
        $(profileRef.current).click((e)=>{
            e.stopPropagation();
            $('[data-overlay]').hide('fast');
            $(overlayRef.current).toggle('fast');
        }).attr('listener-set', 'active');

        $(document).click(()=>$('[data-overlay]').hide('fast'));
    }, []);
    return(
        <div className="">
            <Tooltip title={'Options'}>
                <div ref={profileRef} className="d-flex align-items-center me-3">
                    <div className="rounded-circle bg-lightgray me-0 border-0">
                        <BsPersonFill className="fs-1 text-secondary pointer"/>
                    </div>
                    <IoMdArrowDropdown className="pointer text-secondary"/>
                </div>
            </Tooltip>
            <div className="position-relative">
                <div ref={overlayRef} className="pe-auto position-absolute border text-nowrap end-0 shadow bg-light p-3 me-3" data-overlay="" style={{display: 'none', zIndex: '9999999999999'}}>
                    <div>Grenada Postal Corp</div>
                    <div className="d-flex align-items-center p-2">
                        <div className="me-2">
                            <BsPersonFill className="display-5 rounded-circle border"/>
                        </div>
                        <div>
                            <div>{user?.attributes?.name}</div>                                
                            <button onClick={()=>navigate(routes.settings().default())} className="btn btn-sm btn-light border">
                                <RiAccountBoxFill className="me-1"/>
                                <span>Manage Accounts</span>
                            </button>
                        </div>
                    </div>
                    <div onClick={()=>signout()} className="list-item d-flex align-items-center p-2 border-top">
                        <RiAccountBoxFill className="me-2"/>
                        <div>Sign out of Account</div>
                    </div>
                </div>
            </div>
        </div>
    )
}