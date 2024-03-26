import React, { useEffect, useState } from "react";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { EmployeeSettingCard } from "../components/EmployeeSettingCard";
import { FaUserCog } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

export const ListEmployeesSettings = () =>{
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState();

    const assignUserCredential = () =>{
        api.user.assignCredential(selected?.id).then((response)=>{
            setUsers((urs)=>{
                return urs.map((ur)=>{
                    if(ur?.id === selected?.id){
                        ur.attributes.hasCredential = true;
                    }
                });
            });
        }).catch((error)=>{
            toast.error('Credentials', error);
        }).finally(()=>{
            hideOverlay();
        });
    }

    const showOverlay = (user) =>{
        setSelected(user);
    }

    const hideOverlay = () =>{
        setSelected(null);
    }

    useEffect(()=>{
        api.user.listUsersWithHasCredential().then((response)=>{
            setUsers(response.data.data);
        }).catch((error)=>{
            
        }).finally(()=>{
            
        });
    }, []);

    return(
        <div className="container">
            <div className="d-flex align-items-center h4 py-2 mb-3 border-bottom border-secondary">
                <AiFillSetting />
                <div>Assigning Credentials</div>
            </div>
            {users.map((user, key)=>(
                <button onClick={()=>showOverlay(user)} className="d-flex align-items-center btn btn-light text-start w-100 px-3 py-1 my-1" key={key}>
                    <FaUserCog className="text-primary me-2" />
                    <div className="border-start border-2 ps-2">{user.attributes.name}</div>
                </button>
            ))}
            {selected ? <div onClick={hideOverlay} className="backdrop top-0">
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <div className="bg-white p-4 rounded-3" onClick={e=>e.stopPropagation()}>
                        <EmployeeSettingCard 
                            hasCredential={selected.attributes.hasCredential}
                            onAssignClick={assignUserCredential}
                        />
                    </div>
                </div>
            </div> : null}
        </div>
    )
}