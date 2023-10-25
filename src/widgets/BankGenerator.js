import React, { useEffect, useRef, useState } from "react";
import { PiBankFill } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import $ from 'jquery';
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { useParams } from "react-router-dom";

export const BankGenerator = ({existingBanks, disableApiRequest}) =>{
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
            <div className="border-bottom mb-3">Banks</div>
            {selected.map((bank, key)=>(
                <bank.component banks={banks} data={bank?.data} disableApiRequest={disableApiRequest} key={key}/>
            ))}
            <button onClick={onCreate} className="btn btn-sm btn-primary">Add Bank acount +</button>
        </div>
    )
}

const Bank = ({banks, data, disableApiRequest}) =>{
    const [bankData, setBankData] = useState();

    const params = useParams();

    const timeoutRef = useRef();
    const bankRef = useRef();
    const accountNumberRef = useRef();

    const onSet = () =>{
        if(disableApiRequest) return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if(!bankRef.current.value || !accountNumberRef.current.value) return;
            const record = {
                id: bankData?.id,
                userId: params?.userId,
                bankId: bankRef.current.value,
                number: accountNumberRef.current.value
            }
            if(bankData?.id){
                api.bank.editBankLink(record).then((response)=>{
                    //toast.success('Bank', 'Edited.');
                }).catch((error)=>{
                    toast.error('Bank', error);
                });
            }else{
                api.bank.createBankLink(record).then((response)=>{
                    setBankData(response?.data?.data?.[0]);
                    //toast.success('Bank', 'Created');
                }).catch((error)=>{
                    toast.error('Bank', error);
                });
            }
        }, 500);
    }

    const remove = (e) =>{
        const target = e.currentTarget;
        if(bankData?.id){
            api.bank.deleteUserBank(bankData?.id).then((response)=>{
                setBankData(response?.data?.data?.[0]);
                toast.success('Bank', 'Deleted');
                $(target).parent().parent().remove();
            }).catch((error)=>{
                toast.error('Bank', error);
            });
        }else{
            $(e.currentTarget).parent().parent().remove();
        }
    }

    useEffect(()=>{
        if(!data) return;
        setBankData(data);
        timeoutRef.current = setTimeout(() => {
            $(bankRef.current).find('option').each((i, option)=>{
                if($(option).text() === data?.attributes?.name){
                    $(option).attr('selected', 'selected');
                    accountNumberRef.current.value = data.attributes.number;
                }else $(option).removeAttr('selected');
            });
        }, 100);
    }, [data]);

    return(
        <div className="d-flex w-100 mb-3" data-banks="">
            <div className="bank-container-row w-100 pe-3 rounded-3 bg-white">
                <div className="input-group group-1">
                    <span className="input-group-text"><PiBankFill/></span>
                    <select ref={bankRef} onChange={onSet} className="form-control form-select shadow-none" name="bankId" defaultValue={bankData?.attributes?.name || 'Select a bank'}>
                        {banks.map((bank, key)=>(
                            <option value={bank?.id} key={key}>{bank?.attributes?.name}</option>
                        ))}
                        <option hidden>Select a bank</option>
                    </select>
                </div>
                <div className="input-group">
                    <span className="input-group-text"><AiOutlineFieldNumber/></span>
                    <input ref={accountNumberRef} onKeyUp={onSet} className="form-control shadow-none" name="number" placeholder="bank number" defaultValue={bankData?.attributes?.number}/>
                </div>
            </div>
            <div className="w-100 ps-3 position-relative">
                <span onClick={remove} className="text-danger position-absolute top-0 start-0 pointer border rounded-circle bg-white" style={{marginLeft: '-20px', marginTop: '-10px'}} title="Remove"><IoClose className="fs-4"/></span>
            </div>
            <input hidden value={bankData?.id} name="id" onChange={()=>{}} />
        </div>
    )
}