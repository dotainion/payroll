import React, { createContext, useContext, useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { useEffect } from "react";
import $ from 'jquery';
import { useRef } from "react";

const Context = createContext();
export const useWorkspace = () => useContext(Context);

export const WorkspaceLayout = ({children}) =>{
    const sidebarRef = useRef();
    const bodyRef = useRef();
    const navRef = useRef();
    const containerRef = useRef();

    const value = {
    }

    useEffect(()=>{
        $(window).resize(()=>{
            const width = $(window).width();
            $(bodyRef.current).width(width - $(sidebarRef.current).outerWidth());
            const height = $(window).height();
            $(containerRef.current).height(height - $(navRef.current).outerHeight() -10);
        }).trigger('resize');
    }, []);

    return(
        <Context.Provider value={value}>
            <div className="d-flex w-100">
                <div ref={sidebarRef}>
                    <WorkspaceSidebar/>
                </div>
                <div ref={bodyRef}>
                    <div ref={navRef}>
                        <NavigationBar/>
                    </div>
                    <div ref={containerRef} className="overflow-auto bg-lightgray">
                        {children}
                    </div>
                </div>
            </div>
        </Context.Provider>
    )
}