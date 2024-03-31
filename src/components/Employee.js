import React, { useEffect, useRef, useState } from "react";
import { FaPhone, FaUser, FaDollarSign, FaBirthdayCake, FaAmbulance, FaAddressCard, FaCity } from 'react-icons/fa';
import { MdEmail, MdUpdate } from 'react-icons/md';
import { BankGenerator } from "../widgets/BankGenerator";
import { VscLayersActive } from 'react-icons/vsc';
import { BiMaleFemale, BiFemale, BiMale } from 'react-icons/bi';
import { GiIsland, GiReceiveMoney } from 'react-icons/gi';
import { HiMiniBuildingOffice2 } from 'react-icons/hi2';
import { payload } from "../utils/AddonsPayload";
import { DateHelper } from "../utils/DateHelper";
import { api } from "../request/Api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "../utils/Toast";
import { routes } from "../router/routes";
import { useDocument } from "../contents/DocumentProvider";

export const Employee = ({onSubmit, title}) =>{
    const { addPreviousHistory } = useDocument();

    const [currentUser, setCurrentUser] = useState();
    const [genderIcon, setGenderIcon] = useState();
    const [departments, setDepartments] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    const idRef = useRef();
    const userIdRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const hideRef = useRef();
    const salaryRef = useRef();
    const dobRef = useRef();
    const taxIdRef = useRef();
    const nisIdRef = useRef();
    const otRateRef = useRef();
    const genderRef = useRef();
    const numberRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const addressRef = useRef();
    const departmentRef = useRef();
    const emergencyNumberRef = useRef();
    const registrationDateRef = useRef();

    const onGenderSelect = (e) =>{
        if(e.target.value === 'Male') setGenderIcon('male');
        else if(e.target.value === 'Female') setGenderIcon('female');
        else setGenderIcon(null);
    }

    const onSubmitTrigger = () =>{
        const dobDate = new DateHelper(dobRef.current.valueAsDate);
        if(!dobDate.isValid()) return toast.error('Employee', 'Invalid dob date');
        const registrationDate = new DateHelper(registrationDateRef.current.valueAsDate);
        if(!registrationDate.isValid()) return toast.error('Employee', 'Invalid registration date');
        const data = {
            id: idRef.current,
            userId: userIdRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
            hide: hideRef.current.value,
            salary: salaryRef.current.value,
            dob: dobDate.toSqlString(),
            taxId: taxIdRef.current.value,
            nisId: nisIdRef.current.value,
            otRate: otRateRef.current.value,
            gender: genderRef.current.value,
            number: numberRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            address: addressRef.current.value,
            department: departmentRef.current.value,
            emergencyNumber: emergencyNumberRef.current.value,
            registrationDate: registrationDate.toSqlString(),
            banks: payload.banks.build()
        }
        onSubmit?.(data);
    }

    useEffect(()=>{
        api.department.list().then((response)=>{
            setDepartments(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });

        if(!params?.userId) return;

        api.user.fetchUser(params.userId).then((response)=>{
            setCurrentUser(response.data.data[0]);
            const user = response.data.data[0];
            const date = new DateHelper();
            idRef.current = user.id;
            userIdRef.current.value = user.attributes.userId;
            nameRef.current.value = user.attributes.name;
            emailRef.current.value = user.attributes.email;
            hideRef.current.value = user.attributes.hide;
            salaryRef.current.value = user.attributes.salary;
            dobRef.current.value = date.sqlStringToInput(user.attributes.dob);
            taxIdRef.current.value = user.attributes.taxId;
            nisIdRef.current.value = user.attributes.nisId;
            otRateRef.current.value = user.attributes.otRate;
            genderRef.current.value = user.attributes.gender;
            numberRef.current.value = user.attributes.number;
            cityRef.current.value = user.attributes.city;
            stateRef.current.value = user.attributes.state;
            addressRef.current.value = user.attributes.address;
            departmentRef.current.value = user.attributes.department;
            emergencyNumberRef.current.value = user.attributes.emergencyNumber;
            registrationDateRef.current.value = date.sqlStringToInput(user.attributes.registrationDate);
        }).catch((error)=>{
            console.log(error);
        });

        return ()=>{
            addPreviousHistory({
                title: `Edit ${currentUser?.attributes?.name} profile`, 
                id: currentUser?.id,
                action: ()=>navigate(routes.workspace().nested().editEmployee(currentUser?.id))
            });
        }
    }, []);

    return(
        <div className="mobile-inputes">
            <div className="d-flex justify-content-center p-2 border-bottom text-end my-3 shadow-sm">
                <div className="fw-bold h4 me-3">{title}</div>
                <div>
                    <button onClick={onSubmitTrigger} className="btn btn-sm btn-success px-4">Save</button>
                </div>
            </div>

            <div className="container">
                <div className="d-flex p-2">
                    <div className="shadow rounded-3 p-5 m-2 w-100">
                        <div className="w-100">
                            <label>Employee Name <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><FaUser/></span>
                                <input ref={nameRef} className="form-control shadow-none" placeholder="Name"/>
                            </div>
                        </div>
                        <div className="w-100">
                            <label>Email</label>
                            <div className="input-group">
                                <span className="input-group-text"><MdEmail/></span>
                                <input ref={emailRef} className="form-control shadow-none" type="email" placeholder="example@example.com"/>
                            </div>
                        </div>
                        <div className="w-100">
                            <label>Phone Number</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaPhone/></span>
                                <input ref={numberRef} className="form-control shadow-none" type="tel" placeholder="123 456 7890"/>
                            </div>
                        </div>
                        <div className="w-100">
                            <label>Emergency Number</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaAmbulance/></span>
                                <input ref={emergencyNumberRef} className="form-control shadow-none" type="tel" placeholder="123 456 7890"/>
                            </div>
                        </div>
                        <div className="w-100">
                            <label>DOB</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaBirthdayCake/></span>
                                <input ref={dobRef} className="form-control shadow-none" type="date"/>
                            </div>
                        </div>
                        <div className="w-100">
                            <label>Gender</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <BiMaleFemale className={genderIcon && 'd-none'}/>
                                    <BiFemale className={genderIcon !== 'female' && 'd-none'}/>
                                    <BiMale className={genderIcon !== 'male' && 'd-none'}/>
                                </span>
                                <select ref={genderRef} onChange={onGenderSelect} className="form-control shadow-none" defaultValue={'Select Gender'}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option hidden>Select Gender</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-100">
                            <label>Country</label>
                            <div className="input-group">
                                <span className="input-group-text"><GiIsland/></span>
                                <select ref={stateRef} className="form-control shadow-none" defaultValue={'Grenada'}>
                                    <option>Grenada</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-100">
                            <label>City</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaCity/></span>
                                <select ref={cityRef} className="form-control shadow-none" defaultValue={'Select Status'}>
                                    <option>Saint Andrew</option>
                                    <option>Saint David</option>
                                    <option>Saint George</option>
                                    <option>Saint John</option>
                                    <option>Saint Mark</option>
                                    <option>Saint Patrick</option>
                                    <option>Carriacou</option>
                                    <option>Petite Martinique</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-100">
                            <label>Address</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaAddressCard/></span>
                                <input ref={addressRef} className="form-control shadow-none" placeholder="Address"/>
                            </div>
                        </div>
                    </div>

                    <div className="w-100">
                        <div className="shadow rounded-3 p-5 m-2 w-100">
                            <div className="w-100">
                                <label>Department</label>
                                <div className="input-group">
                                    <span className="input-group-text"><HiMiniBuildingOffice2/></span>
                                    <select ref={departmentRef} className="form-control shadow-none" defaultValue={'Select Status'}>
                                        {departments.map((dept)=>(
                                            <option>{dept?.attributes?.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="w-100">
                                <label>ID <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaUser/></span>
                                    <input ref={userIdRef} className="form-control shadow-none" placeholder="ID"/>
                                </div>
                            </div>
                            <div className="w-100">
                                <label>Nis ID</label>
                                <div className="input-group">
                                    <span className="input-group-text fw-bold"><small>NIS</small></span>
                                    <input ref={nisIdRef} className="form-control shadow-none"/>
                                </div>
                            </div>
                            <div className="w-100">
                                <label>Tax ID</label>
                                <div className="input-group">
                                    <span className="input-group-text"><MdUpdate/></span>
                                    <input ref={taxIdRef} className="form-control shadow-none"/>
                                </div>
                            </div>
                            <div className="w-100">
                                <label>Registration Date</label>
                                <div className="input-group">
                                    <span className="input-group-text"><MdUpdate/></span>
                                    <input ref={registrationDateRef} className="form-control shadow-none" type={'date'}/>
                                </div>
                            </div>
                        </div>

                        <div className="shadow rounded-3 p-5 m-2 w-100">
                            <div className="w-100 px-3">
                                <label>Base Salary</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaDollarSign/></span>
                                    <input ref={salaryRef} className="form-control shadow-none" type="number" placeholder="0.00"/>
                                </div>
                            </div>
                            <div className="w-100 px-3">
                                <label>Hourly Amount</label>
                                <div className="input-group">
                                    <span className="input-group-text"><GiReceiveMoney/></span>
                                    <input ref={otRateRef} className="form-control shadow-none" placeholder="0.00"/>
                                </div>
                            </div>
                            <div className="w-100 px-3">
                                <label>Status</label>
                                <div className="input-group">
                                    <span className="input-group-text"><VscLayersActive/></span>
                                    <select ref={hideRef} className="form-control shadow-none" defaultValue={'Active'}>
                                        <option value={false}>Active</option>
                                        <option value={true}>Terminated</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}