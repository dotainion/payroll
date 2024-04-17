import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { LoanAddOn, LoanAddOnExisting } from "../addons/LoanAddOn";
import { AddOn, ExistingAddOn } from "../addons/Addons";
import { NoPayLeaveAddOn, NoPayLeaveAddOnExisting } from "../addons/NoPayLeaveAddOn";
import { api } from "../request/Api";
import { MdAdd } from 'react-icons/md';
import { ExistingOvertimeAddOn, OvertimeAddOn } from "../addons/OvertimeAddOn";

export const AllowanceGenerator = ({user, loanAllowances, banks, otSettings, existingAllowances}) =>{
    const [allowance, setAllowance] = useState([]);
    const [avilableAllowance, setAvailableAllowance] = useState([]);

    const allowanceRef = useRef();

    const onCreate = () =>{
        setAllowance((allows)=>[...allows, {component: AddOn}]);
        $(allowanceRef.current).trigger('change');
    }

    const onSelect = (data) =>{
        data.linkId = data.linkId || data.id;
        data.id = null;
        setAllowance((allows)=>[...allows, {component: ExistingAddOn, data: data}]);
        $(allowanceRef.current).trigger('change');
    }

    const onCreateLoan = () =>{
        setAllowance((allows)=>[...allows, {component: LoanAddOn}]);
        $(allowanceRef.current).trigger('change');
    }

    const onSelectLoan = (data) =>{
        data.linkId = data.linkId || data.id;
        data.id = null;
        setAllowance((allows)=>[...allows, {component: LoanAddOnExisting, data: data}]);
        $(allowanceRef.current).trigger('change');
    }

    const onCreateNoPayLeave = () =>{
        setAllowance((allows)=>[...allows, {component: NoPayLeaveAddOn}]);
        $(allowanceRef.current).trigger('change');
    }

    const onSelectNoPayLeave = (data) =>{
        data.linkId = data.linkId || data.id;
        data.id = null;
        setAllowance((allows)=>[...allows, {component: NoPayLeaveAddOnExisting, data: data}]);
        $(allowanceRef.current).trigger('change');
    }

    const onCreateOvertime = () =>{
        setAllowance((allows)=>[...allows, {component: OvertimeAddOn}]);
        $(allowanceRef.current).trigger('change');
    }

    const onSelectOvertime = (data) =>{
        data.linkId = data.linkId || data.id;
        data.id = null;
        setAllowance((allows)=>[...allows, {component: ExistingOvertimeAddOn, data: data}]);
        $(allowanceRef.current).trigger('change');
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
        <div ref={allowanceRef} className="d-block bg-white">
            <div className="d-inline-block">
                <div data-report-allowances="">
                    {allowance.map((card, key)=>(
                        <card.component data={card.data} banks={banks} otSettings={otSettings} user={user} key={key} />
                    ))}
                </div>
                <div className="text-end p-3">
                    <div className="dropdown-button-group">
                        <Dropdown as={ButtonGroup} size="sm">
                            <Button onClick={onCreate} className="text-nowrap"><span className="me-2">Add</span><MdAdd/></Button>
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
                            <Button onClick={onCreateNoPayLeave} className="text-nowrap"><span className="me-2">Pay Leave</span><MdAdd/></Button>
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
                            <Button onClick={onCreateLoan} className="text-nowrap"><span className="me-2">Loan</span><MdAdd/></Button>
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

                        <Dropdown as={ButtonGroup} size="sm">
                            <Button onClick={onCreateOvertime} className="text-nowrap"><span className="me-2">Over Time</span><MdAdd/></Button>
                            <Dropdown.Toggle split variant="primary"/>
                            <Dropdown.Menu className="super-colors">
                                <div className="overflow-auto" style={{maxHeight: '300px'}}>
                                    {
                                        []?.length?
                                        []?.map((allow, key)=>(
                                            <Dropdown.Item onClick={(e)=>onSelectOvertime?.(allow, e)} as="button" key={key}>{allow?.attributes?.name}</Dropdown.Item>
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



