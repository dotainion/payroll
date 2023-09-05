import React, { useEffect, useRef } from "react";
import { IoClose } from 'react-icons/io5';
import { BiSolidFilePdf } from 'react-icons/bi';
import { BsCalendar2Date, BsCalendar2DateFill } from 'react-icons/bs';
import $ from 'jquery';
import { FaDollarSign } from "react-icons/fa";
import { DateHelper } from "../utils/DateHelper";

export const NoPayLeaveAddOn = ({data}) =>{
    const fileRef = useRef();
    const dropRef = useRef();
    
    const idRef = useRef();
    const fromRef = useRef();
    const toRef = useRef();

    const remove = (e) =>{
        $(e.currentTarget).parent().parent().remove();
    }

    useEffect(()=>{
        window.addEventListener("dragover", (e)=>{
            e.preventDefault();
        }, false);
        window.addEventListener("drop", (e)=>{
            e.preventDefault();
        }, false);

        $(dropRef.current).on('drop', (e)=>{
            fileRef.current.files = e.originalEvent.dataTransfer.files;
        });
    }, []);

    useEffect(()=>{
        if(!data) return;
        const date = new DateHelper();
        fromRef.current.value = date.sqlStringToInput(data?.attributes?.from);
        toRef.current.value = date.sqlStringToInput(data?.attributes?.to);
    }, [data]);

    return(
        <div className="d-flex align-items-center w-100" data-no-pay-leave="">
            <div className="allowance-row border m-3">
                <input className="form-control shadow-none" name="name" placeholder="No pay leave" defaultValue={data?.attributes?.name} />
                <div className="d-flex align-items-center">
                    <div className="me-2 w-100">
                        <div className="small">From</div>
                        <div className="input-group">
                            <span className="input-group-text"><BsCalendar2Date/></span>
                            <input ref={fromRef} className="form-control shadow-none" type="date" name="from" />
                        </div>
                    </div>
                    <div className="w-100">
                        <div className="small">to</div>
                        <div className="input-group">
                            <span className="input-group-text"><BsCalendar2DateFill/></span>
                            <input ref={toRef} className="form-control shadow-none" type="date" name="to"/>
                        </div>
                    </div>
                </div>
                <div className="input-group mt-3">
                    <span className="input-group-text"><FaDollarSign/></span>
                    <input className="form-control shadow-none" name="amount" placeholder="0.00" defaultValue={data?.attributes?.amount}/>
                </div>
                <div 
                    ref={dropRef} 
                    onClick={()=>$(fileRef.current).trigger('click')} 
                    onDragOver={(e)=>$(e.currentTarget).addClass('dropzone-dashed')} 
                    onDragLeave={(e)=>$(e.currentTarget).removeClass('dropzone-dashed')}
                    className="dropzone rounded-3 d-flex align-items-center justify-content-center bg-light mt-2 p-2"
                >
                    <div className="me-1"><span className="fw-bold">Attach PDF</span> or drag it here</div>
                    <BiSolidFilePdf className="ms-1 fs-3"/>
                    <input ref={fileRef} accept="application/pdf" type="file" hidden />
                </div>
                <span onClick={remove} className="close" title="Remove"><IoClose className="fs-4"/></span>
            </div>
            <div className="text-danger">
                <div className="p-3 bg-light"></div>
            </div>
            <input ref={idRef} hidden value={data?.id} name="id" onChange={()=>{}} />
        </div>
    )
}


export const NoPayLeaveAddOnExisting = ({data}) =>{
    return(
        <NoPayLeaveAddOn data={data} />
    )
}