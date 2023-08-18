import React, { useRef, useState } from "react";
import { GoWorkflow } from 'react-icons/go';
import $ from 'jquery';
import { MdDelete } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { BiSolidReport } from "react-icons/bi";
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";

export const EmployeeOptions = ({optionRef, onEdit, onDelete, onReport, onSeeReport, onBulkReport}) =>{
    const navigate = useNavigate();
    
    const onTriggerEdit = () =>{
        onEdit?.();
    }

    const onTriggerDelete = () =>{
        onDelete?.();
    }

    const onTriggerReport = () =>{
        onReport?.();
    }

    const onTriggerSeeReport = () =>{
        onSeeReport?.();
    }

    const onTriggerBulkReport = (e) =>{
        if($(e.currentTarget).attr('data-disabled') === 'disabled') return;
        onBulkReport?.();
    }
    return(
        <div ref={optionRef} onClick={e=>e.stopPropagation()} className="rounded-3 arrow-up position-absolute pt-4 pb-2 mt-2 bg-white shadow-sm" style={{display: 'none'}}>
            <span onClick={onTriggerEdit} data-edit className="list-item w-100 rounded-0 d-flex align-items-center">
                <LiaEdit className="me-2"/>
                <span>Edit</span>
            </span>
            <span onClick={onTriggerDelete} data-delete className="list-item w-100 rounded-0 d-flex align-items-center opacity-50">
                <MdDelete className="me-2"/>
                <span>Delete</span>
            </span>
            <hr></hr>
            <span onClick={onTriggerSeeReport} data-report className="list-item w-100 rounded-0 d-flex align-items-center">
                <BiSolidReport className="me-2"/>
                <span>See Reports</span>
            </span>
            <span onClick={onTriggerReport} data-report className="list-item w-100 rounded-0 d-flex align-items-center">
                <BiSolidReport className="me-2"/>
                <span>Generate Report</span>
            </span>
            <span onClick={onTriggerBulkReport} data-bulk className="list-item w-100 rounded-0 d-flex align-items-center opacity-50" data-disabled="disabled">
                <BiSolidReport className="me-2"/>
                <span>Generate Bulk Report</span>
            </span>
        </div>
    )
}