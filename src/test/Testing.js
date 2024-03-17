import React, { useEffect, useRef, useState } from "react";
import { FaPiedPiperAlt, FaRoute, FaUser } from 'react-icons/fa';
import { MdAdd, MdAddTask, MdDeleteForever, MdFileDownloadDone, MdPending, MdSend } from 'react-icons/md';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import $ from 'jquery';
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { useLocation, useParams } from "react-router-dom";
import { TodoComponent } from "../components/TodoComponent";
import img from '../images/no-notific.png'
import { BsPersonFillAdd } from "react-icons/bs";
import { PiBankBold } from "react-icons/pi";
import { Employee } from "../components/Employee";
import { IoMdAlert } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";
import { FcTodoList } from "react-icons/fc";
import { TodoList } from "../pages/TodoList";
import { PayrollAdjustment } from "../components/PayrollAdjustment";
import { ViewTaxReports } from "../pages/ViewTaxReports";

//https://www.npmjs.com/package/react-minimal-pie-chart
export const Testing = () =>{
    const [row, setRow] = useState([]);
    const [defaultValue, setDefaultValue] = useState('');
    const [animated, setAnimated] = useState();

    const params = useParams();
    const location = useLocation();

    const pageRef = useRef();
    const rouetRef = useRef();

    const salarayRef = useRef();
    const calendarRef = useRef();

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

    const onMeClik = () =>{
        setAnimated(!animated);
    }

    useEffect(()=>{
        
    }, []);


    return (
        <ViewTaxReports/>
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