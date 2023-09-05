import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { LoanAddOn, LoanAddOnExisting } from "../addons/LoanAddOn";
import { AddOn, ExistingAddOn } from "../addons/Addons";
import { api } from "../request/Api";
import { MdAdd } from 'react-icons/md';
import { NoPayLeaveAddOn, NoPayLeaveAddOnExisting } from "../addons/NoPayLeaveAddOn";
import { toast } from "../utils/Toast";

export const DeductionGenerator = ({loanDeductions, loans, banks, existingDeductions}) =>{
    const [deduction, setDeduction] = useState([]);
    const [availableDeduction, setAvailableDeduction] = useState([]);

    const onCreate = () =>{
        setDeduction((allows)=>[...allows, {component: AddOn}]);
    }

    const onSelect = (data) =>{
        data.id = null;
        setDeduction((allows)=>[...allows, {component: ExistingAddOn, data: data}]);
    }

    const onCreateLoan = () =>{
        setDeduction((allows)=>[...allows, {component: LoanAddOn}]);
    }

    const onSelectLoan = (data) =>{
        data.id = null;
        setDeduction((allows)=>[...allows, {component: LoanAddOnExisting, data: data}]);
    }

    const onCreateNoPayLeave = () =>{
        setDeduction((allows)=>[...allows, {component: NoPayLeaveAddOn}]);
    }

    const onSelectNoPayLeave = (data) =>{
        data.id = null;
        setDeduction((allows)=>[...allows, {component: NoPayLeaveAddOnExisting, data: data}]);
    }

    useEffect(()=>{
        if(!existingDeductions?.length) return;
        setDeduction((ext)=>[...ext, ...existingDeductions]);
    }, [existingDeductions]);

    useEffect(()=>{
        api.deduction.list().then((response)=>{
            setAvailableDeduction(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return(
        <div className="d-block bg-white">
            <div className="d-inline-block">
                <div data-report-deductions="">
                    {deduction.map((card, key)=>(
                        <card.component data={card.data} banks={banks} key={key}/>
                    ))}
                </div>
                <div className="text-end p-3">
                    <div className="dropdown-button-group">
                        <Dropdown as={ButtonGroup} size="sm">
                            <Button onClick={onCreate}><span className="me-2">Add</span><MdAdd/></Button>
                            <Dropdown.Toggle split variant="primary"/>
                            <Dropdown.Menu className="super-colors">
                                <div className="overflow-auto" style={{maxHeight: '300px'}}>
                                    {
                                        availableDeduction.length?
                                        availableDeduction.map((allow, key)=>(
                                            <Dropdown.Item onClick={(e)=>onSelect?.(allow, e)} as="button" key={key}>{allow?.attributes?.name}</Dropdown.Item>
                                        )):<div className="px-3 small text-center text-white bg-primary">No Records</div>
                                    }
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown as={ButtonGroup} size="sm">
                            <Button onClick={onCreateNoPayLeave}><span className="me-2">No Pay Leave</span><MdAdd/></Button>
                            <Dropdown.Toggle split variant="primary"/>
                            <Dropdown.Menu className="super-colors">
                                <div className="overflow-auto" style={{maxHeight: '300px'}}>
                                    {
                                        []?.length?
                                        []?.map((allow, key)=>(
                                            <Dropdown.Item onClick={(e)=>onSelectNoPayLeave?.(allow, e)} as="button" key={key}>{allow?.attributes?.name}</Dropdown.Item>
                                        )):<div className="px-3 small text-center text-white bg-primary">No Records</div>
                                    }
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown as={ButtonGroup} size="sm">
                            <Button onClick={onCreateLoan}><span className="me-2">Loan</span><MdAdd/></Button>
                            <Dropdown.Toggle split variant="primary"/>
                            <Dropdown.Menu className="super-colors">
                                <div className="overflow-auto" style={{maxHeight: '300px'}}>
                                    {
                                        loanDeductions?.length?
                                        loanDeductions?.map((allow, key)=>(
                                            <Dropdown.Item onClick={(e)=>onSelectLoan?.(allow, e)} as="button" key={key}>{allow?.attributes?.name}</Dropdown.Item>
                                        )):<div className="px-3 small text-center text-white bg-primary">No Records</div>
                                    }
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}



