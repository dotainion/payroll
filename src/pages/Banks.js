import React, { forwardRef, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { CiBank } from "react-icons/ci";
import { api } from "../request/Api";
import { toast } from "../utils/Toast";

export const Banks = () =>{
    const [banks, setBanks] = useState([]);

    const nameRef = useRef();
    const scrollRef = useRef();
    const closeRef = useRef();
    const buttonRef = useRef();
    const inputContainerRef = useRef();

    const onSave = () =>{
        api.bank.create(nameRef.current.value).then((response)=>{
            setBanks((allows)=>[response.data.data[0], ...allows]);
            toast.success('Bank', 'Created');
            nameRef.current.value = '';
        }).catch((error)=>{
            console.log(error);
            toast.error('Bank', error);
        });
    }

    const onDelete = (e) =>{
        const parent = $(e.currentTarget).parent().parent().parent().parent();
        const id = parent.find('input[name=id]').val();
        api.bank.delete(id).then((response)=>{
            parent.remove();
            toast.success('Bank', 'Created');
        }).catch((error)=>{
            console.log(error);
            toast.error('Bank', error);
        });
    }

    const onEdit = (e) =>{
        const parent = $(e.currentTarget).parent().parent();
        const id = parent.find('input[name=id]').val();
        const name = parent.find('input[name=name]').val();
        api.bank.edit(id, name).then((response)=>{
            parent.find('[data-read-only]').each((i, child)=>{
                $(child).find('[data-name]').text(name);
            });
            toast.success('Bank', 'Created');
            nameRef.current.value = '';
        }).catch((error)=>{
            console.log(error);
            toast.error('Bank', error);
        });
    }

    const onOpenEdit = (e) =>{
        onCloseAllEdit();
        const parent = $(e.currentTarget).parent().parent().parent().parent();
        parent.find('[data-editable]').show('fast');
        parent.find('[data-read-only]').hide('fast');
    }

    const onCloseAllEdit = () =>{
        const parent = $('[data-read-only]').parent();
        parent.find('[data-editable]').hide('fast');
        parent.find('[data-read-only]').show('fast');
    }

    useEffect(()=>{
        api.bank.list().then((response)=>{
            setBanks(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }, []);

    useEffect(()=>{
        $(buttonRef.current).click(()=>{
            $(buttonRef.current).hide('fast');
            $(inputContainerRef.current).show('fast');
            $(scrollRef.current).css({height: '60vh'});
        });
        $(closeRef.current).click(()=>{
            $(buttonRef.current).show('fast');
            $(inputContainerRef.current).hide('fast');
            $(scrollRef.current).css({height: '75vh'});
        });
        $(scrollRef.current).css({height: '75vh'});
        $(window).click(()=>onCloseAllEdit());
    }, []);

    return(
        <div className="page profile text-nowrap">
            <div className="border-bottom p-2 fw-bold bg-secondary text-white mt-2">Banks</div>
            <div className="my-3">
                <button ref={buttonRef} className="btn btn-info btn-sm">New Bank +</button>
            </div>
            <BankCard ref={inputContainerRef} nameRef={nameRef} closeRef={closeRef} onSave={onSave}/>
            <hr></hr>
            <div ref={scrollRef} className="overflow-auto">
                {banks.map((bank, key)=>(
                    <div onClick={(e)=>e.stopPropagation()} className="my-2" key={key}>
                        <div data-read-only="">
                            <div className="d-flex align-items-center border w-100 bg-light">
                                <div className='d-flex align-items-center w-100 px-2 py-1'>
                                    <div className='w-50'>
                                        <div className="fw-bold small p-0 m-0"><small>Name:</small></div>
                                        <div className="text-truncate" style={{marginTop: '-5px'}} data-name="">{bank?.attributes?.name}</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center px-2">
                                    <button onClick={onOpenEdit} className="btn btn-sm btn-outline-primary px-4 py-0">Edit</button>
                                    <button onClick={onDelete} className="btn btn-sm btn-outline-danger px-3 ms-2 py-0">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="border border-info p-1" data-editable="" style={{display: 'none'}}>
                            <BankCard onSave={onEdit} onClose={onCloseAllEdit} data={bank} show/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const BankCard = forwardRef(({nameRef, closeRef, onSave, onClose, data, show}, ref)=>{
    return(
        <div ref={ref} style={{display: show ? '' : 'none'}}>
            <div className="allowance-row border m-3">
                <div className="input-group">
                    <span className="input-group-text"><CiBank/></span>
                    <input ref={nameRef} className="form-control shadow-none" name="name" placeholder="Bank Name" defaultValue={data?.attributes?.name}/>
                </div>
            </div>
            <div className="my-3">
                <button ref={closeRef} onClick={onClose} className="btn btn-sm btn-info px-3 text-danger">Cancel</button>
                <button onClick={onSave} className="btn btn-sm btn-info px-3 ms-3">Save</button>
            </div>
            <input hidden value={data?.id} name="id" />
        </div>
    )
})