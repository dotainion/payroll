import React, { useEffect, useRef, useState } from "react";
import { PiBankFill } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import $ from 'jquery';
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { useParams } from "react-router-dom";

export const BankGenerator = ({existingBanks}) =>{
    const [banks, setBanks] = useState([]);
    const [selected, setSelected] = useState([]);

    const onCreate = () =>{
        setSelected((allows)=>[...allows, {component: Bank}]);
    }

    useEffect(()=>{
        if(!existingBanks?.length) return;
        setSelected((ext)=>[...ext, ...existingBanks.map((data)=>{
            return {component: Bank, data: data};
        })]);
    }, [existingBanks]);

    useEffect(()=>{
        api.bank.list().then((response)=>{
            setBanks(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    return(
        <div>
            <div>Banks</div>
            {selected.map((bank, key)=>(
                <bank.component banks={banks} data={bank?.data} key={key}/>
            ))}
            <button onClick={onCreate} className="btn btn-sm btn-primary">Add Bank acount +</button>
        </div>
    )
}

const Bank = ({banks, data}) =>{
    const params = useParams();

    const timeoutRef = useRef();
    const bankRef = useRef();
    const accountNumberRef = useRef();

    const onSet = () =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if(!bankRef.current.value || !accountNumberRef.current.value) return;
            const record = {
                id: data?.id,
                userId: params?.userId,
                bankId: bankRef.current.value,
                number: accountNumberRef.current.value
            }
            if(data?.id){
                api.bank.editBankLink(record).then((response)=>{
                    toast.success('Bank', 'Edited.');
                }).catch((error)=>{
                    toast.error('Bank', error);
                });
            }else{
                api.bank.createBankLink(record).then((response)=>{
                    toast.success('Bank', 'Created');
                }).catch((error)=>{
                    toast.error('Bank', error);
                });
            }
        }, 500);
    }

    const remove = (e) =>{
        $(e.currentTarget).parent().parent().remove();
    }

    return(
        <div className="d-flex w-100 mb-2" data-banks="">
            <div className="w-100 pe-3">
                <div className="input-group">
                    <span className="input-group-text"><PiBankFill/></span>
                    <select ref={bankRef} onChange={onSet} className="form-control form-select shadow-none" name="bankId" defaultValue={data?.attributes?.name || 'Select a bank'}>
                        {banks.map((bank, key)=>(
                            <option value={bank?.id} key={key}>{bank?.attributes?.name}</option>
                        ))}
                        <option hidden>Select a bank</option>
                    </select>
                </div>
                <div className="input-group">
                    <span className="input-group-text"><AiOutlineFieldNumber/></span>
                    <input ref={accountNumberRef} onKeyUp={onSet} className="form-control shadow-none" name="number" placeholder="bank number" defaultValue={data?.attributes?.number}/>
                </div>
            </div>
            <div className="w-100 ps-3 position-relative">
                <span onClick={remove} className="text-danger position-absolute top-0 start-0 pointer" style={{marginLeft: '-20px', marginTop: '-10px'}} title="Remove"><IoClose className="fs-4"/></span>
            </div>
            <input hidden value={data?.id} name="id" />
        </div>
    )
}