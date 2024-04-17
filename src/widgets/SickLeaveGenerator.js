import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { api } from "../request/Api";
import { MdAdd } from 'react-icons/md';
import { ExistingSickLeaveAddOn, SickLeaveAddOn } from "../addons/SickLeaveAddOn";

export const SickLeaveGenerator = ({user, existingSickLeaves}) =>{
    const [setting, setSetting] = useState();
    const [reduceTo, setReduceTo] = useState(0);
    const [sickLeaves, setSickLeave] = useState([]);
    const [availableSickLeave, setAvailableSickLeave] = useState([]);

    const leaveRef = useRef();

    const onCreate = () =>{
        setSickLeave((sick)=>[...sick, {component: SickLeaveAddOn}]);
        $(leaveRef.current).trigger('change');
    }

    const onSelect = (data) =>{
        data.linkId = data.linkId || data.id;
        data.id = null;
        setSickLeave((sick)=>[...sick, {component: ExistingSickLeaveAddOn, data: data}]);
        $(leaveRef.current).trigger('change');
    }

    const addSalary = (cost) =>{
        setReduceTo((sub)=>cost + sub);
        $(leaveRef.current).trigger('change');
    }

    useEffect(()=>{
        if(!existingSickLeaves?.length) return;
        setSickLeave((ext)=>[...ext, ...existingSickLeaves]);
    }, [existingSickLeaves]);

    useEffect(()=>{
        api.settings.fetchSickLeaveSettings().then((response)=>{
            setSetting(response.data.data[0]);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return(
        <div ref={leaveRef} className="d-block bg-white">
            <div className="d-inline-block">
                {
                    sickLeaves?.length ? 
                    <div className="row">
                        <div className="d-flex my-2">
                            <div className="bg-primary ps-1"></div>
                            <div className="bg-light p-4">
                                <ul className="list-group alert alert-primary">
                                    <li className="d-flex align-items-center small list-group-item">
                                        <div>Salary will have a deduction of <b>{setting?.attributes?.percentageOfSalary}%</b>, a total of <b>${reduceTo}</b> will be applie to employee account.</div>
                                    </li>
                                    {
                                        setting?.attributes?.includeSalary?
                                        <li className="d-flex align-items-center small list-group-item">
                                            <div>Salary will <b>remain</b> on this report. <b>{user?.attributes?.salary}</b></div>
                                        </li>:
                                        <li className="d-flex align-items-center small list-group-item">
                                            <div>Salary will be <b>exempt</b> from this report. <b>-{user?.attributes?.salary}</b></div>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>: null
                }
                <div data-report-sickleaves="">
                    {sickLeaves.map((card, key)=>(
                        <card.component 
                            user={user} 
                            data={card.data} 
                            setting={setting} 
                            onSickLeaveAmount={addSalary} 
                            key={key}
                        />
                    ))}
                </div>
                <div className="text-end p-3">
                    <div className="dropdown-button-group">
                        <Dropdown as={ButtonGroup} size="sm">
                            <Button onClick={onCreate} className="text-nowrap"><span className="me-2">Add Sick Leave</span><MdAdd/></Button>
                            <Dropdown.Toggle split variant="primary"/>
                            <Dropdown.Menu className="super-colors">
                                <div className="overflow-auto" style={{maxHeight: '300px'}}>
                                    {
                                        availableSickLeave.length?
                                        availableSickLeave.map((sick, key)=>(
                                            <Dropdown.Item onClick={(e)=>onSelect?.(sick, e)} as="button" key={key}>{sick?.attributes?.name}</Dropdown.Item>
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



