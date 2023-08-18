import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { LoanAddOn, LoanAddOnExisting } from "../addons/LoanAddOn";
import { AddOn, ExistingAddOn } from "../addons/Addons";
import { NoPayLeaveAddOn, NoPayLeaveAddOnExisting } from "../addons/NoPayLeaveAddOn";
import { api } from "../request/Api";
import { MdAdd } from 'react-icons/md';
import { toast } from "../utils/Toast";

export const AllowanceGenerator = ({loanAllowances, banks, onRemove, existingAllowances}) =>{
    const [allowance, setAllowance] = useState([]);
    const [avilableAllowance, setAvailableAllowance] = useState([]);

    const onCreate = () =>{
        setAllowance((allows)=>[...allows, {component: AddOn}]);
    }

    const onSelect = (data) =>{
        setAllowance((allows)=>[...allows, {component: ExistingAddOn, data: data}]);
    }

    const onCreateLoan = () =>{
        setAllowance((allows)=>[...allows, {component: LoanAddOn}]);
    }

    const onSelectLoan = (data) =>{
        setAllowance((allows)=>[...allows, {component: LoanAddOnExisting, data: data}]);
    }

    const onCreateNoPayLeave = () =>{
        setAllowance((allows)=>[...allows, {component: NoPayLeaveAddOn}]);
    }

    const onSelectNoPayLeave = (data) =>{
        setAllowance((allows)=>[...allows, {component: NoPayLeaveAddOnExisting, data: data}]);
    }

    useEffect(()=>{
        if(!existingAllowances?.length) return;
        setAllowance((ext)=>[...ext, ...existingAllowances]);
    }, [existingAllowances]);

    useEffect(()=>{
        api.allowance.list().then((response)=>{
            setAvailableAllowance(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return(
        <div className="d-block bg-white">
            <div className="d-inline-block">
                <div data-report-allowances="">
                    {allowance.map((card, key)=>(
                        <card.component data={card.data} onRemove={onRemove} banks={banks} key={key} />
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
                                        avilableAllowance.length?
                                        avilableAllowance.map((allow, key)=>(
                                            <Dropdown.Item onClick={(e)=>onSelect?.(allow, e)} as="button" key={key}>{allow?.attributes?.name}</Dropdown.Item>
                                        )):<div className="px-3 small text-center text-white bg-primary">No Records</div>
                                    }
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown as={ButtonGroup} size="sm">
                            <Button onClick={onCreateNoPayLeave}><span className="me-2">Pay Leave</span><MdAdd/></Button>
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
                                        loanAllowances?.length?
                                        loanAllowances?.map((allow, key)=>(
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



