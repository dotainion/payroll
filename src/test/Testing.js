import React, { useEffect, useRef, useState } from "react";
import { FaPiedPiperAlt, FaRoute } from 'react-icons/fa';
import { MdAddTask, MdDeleteForever, MdOutlineMailLock, MdSend } from 'react-icons/md';
import $ from 'jquery';
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { NotAuthenticated } from "../other/NotAuthenticated";
import ReactToPrint from "react-to-print";
import { Payslip } from "../invoices/components/Payslip";
import { useParams } from "react-router-dom";
import { BulkPayslip } from "../invoices/pages/BulkPayslip";
import { InvoiceLayout } from "../layout/InvoiceLayout";
import { RiLockPasswordFill } from "react-icons/ri";
import { BankGenerator } from "../widgets/BankGenerator";
import { EmployeeSettings } from "../pages/EmployeeSettings";
import { Notifications } from "../pages/Notifications";
import { Security } from "../pages/Security";
import { AddOn } from "../addons/Addons";
import { AssignPassword } from "../accounts/AssignPassword";
import { ElementHandler } from "../utils/ElementHandler";
import { CreateEmployee } from "../pages/CreateEmployee";
import { EditEmployee } from "../pages/EditEmployee";

export const Testing = () =>{
    const [row, setRow] = useState([]);
    const [defaultValue, setDefaultValue] = useState('');

    const params = useParams();

    const pageRef = useRef();
    const rouetRef = useRef();

    const testRef = useRef();

    const onRemove = (e) =>{
        $(e.currentTarget).parent().remove();
    }

    const onAdd = () =>{
        setRow((r)=>[...r, 1]);
    }

    const onSubmit = () =>{
        if(!rouetRef.current.value.startsWith('/')){
            return alert('Route must start with "/" eg: "/create/new/data"');
        }
        const json = {};
        $(pageRef.current).children().each((i, child)=>{
            json[$(child).find('[name=attr]').val()] = $(child).find('[name=value]').val();
        });
        api.post(rouetRef.current.value, json).then((response)=>{
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
            toast.error('Hello', error);
        });
    }

    useEffect(()=>{
        
    }, []);

    return (
        <EditEmployee/>
    )

    return(
        <div>
            <label className="mt-3">Email:</label>
            <div className="input-group">
                <span className="input-group-text"><MdOutlineMailLock/></span>
                <input className="form-control shadow-none" placeholder="example@example.com" type="email"/>
            </div>
            <label className="mt-3">Password:</label>
            <div className="input-group">
                <span className="input-group-text"><RiLockPasswordFill/></span>
                <input className="form-control shadow-none" placeholder="Password1234#" type="password"/>
            </div>
            <label className="mt-3">Confirm Password:</label>
            <div className="input-group">
                <span className="input-group-text"><RiLockPasswordFill/></span>
                <input className="form-control shadow-none" placeholder="Password1234#" type="password"/>
            </div>
            <button onClick={()=>{
                window.location.href = "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
            }}>Send Email</button>
        </div>
    )

    return(
        <div className="">
            <select defaultValue={defaultValue} id="test">
                <option value={'1'}>helo world1</option>
                <option value={'2'}>helo world2</option>
                <option value={'3'}>helo world3</option>
            </select>
            <button onClick={()=>$('#test').find('option[value=2]').attr('selected', 'selected')}>Click me</button>
            <div className="display-5 fw-bold text-center bg-primary text-white p-2">Developer</div>
            <div className="container p-3">
                <div className="input-group mt-2 mb-4">
                    <span className="input-group-text border-primary"><FaRoute/></span>
                    <input ref={rouetRef} className="form-control shadow-none border-primary" name="attr" placeholder="/some/routeing"/>
                </div>
                <div ref={pageRef}>
                    {row.map((_, key)=>(
                        <div className="input-group my-2" key={key}>
                            <button className="input-group-text"><FaPiedPiperAlt/></button>
                            <input className="form-control shadow-none" name="attr" placeholder="attribute"/>
                            <input className="form-control shadow-none" name="value" placeholder="value"/>
                            <button onClick={onRemove} className="input-group-text text-danger"><MdDeleteForever/></button>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-end my-3">
                    <button onClick={onAdd} className="btn btn-sm btn-primary px-4">Add<MdAddTask className="ms-2"/></button>
                    <button onClick={onSubmit} className="btn btn-sm btn-success px-4 ms-3">Submit<MdSend className="ms-2"/></button>
                </div>
            </div>
        </div>
    )
}