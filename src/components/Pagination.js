import React, { useEffect, useRef, useState } from "react";
import { Searchbar } from "./Searchbar";
import $ from 'jquery';
import { api } from "../request/Api";

export const Pagination = ({title, onScroll, beginChildren, onDateSearch, searchTargetContainer, children}) =>{
    const scrollRef = useRef();

    const onSearch = (e) =>{
        let container = null;
        if(!searchTargetContainer) container = $(scrollRef.current).find('tbody');
        else container = searchTargetContainer;

        $(container).children().each((i, child)=>{
            $(child).text().toLowerCase().includes(e.target.value.toLowerCase()) 
                ? $(child).show('fast') 
                : $(child).hide('fast');
        });
    }

    const onFilter = (value) =>{
        onSearch({target: {value}});
    }

    return(
        <div className="w-100">
            <div className="bg-white m-2 p-2 rounded-3">
                <div className="fw-bold px-3">{title}</div>
                <Searchbar onTyping={onSearch} onFilter={onFilter} onDateSearch={onDateSearch} beginChildren={beginChildren}/>
                <div ref={scrollRef} onScroll={onScroll} className="my-2 overflow-auto" style={{height: '75vh'}}>
                    {children}
                </div>
                <nav aria-label="Page navigation user-select-none">
                    <ul className="pagination justify-content-center">
                        <li className="page-item pointer disabled"><a className="page-link shadow-none">Previous</a></li>
                        <li className="page-item pointer"><a className="page-link shadow-none">1</a></li>
                        <li className="page-item pointer disabled"><a className="page-link shadow-none">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}