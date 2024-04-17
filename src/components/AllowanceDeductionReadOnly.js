import { useEffect, useRef, useState } from "react";
import { TbSettingsUp } from 'react-icons/tb';
import $ from 'jquery';
import { api } from "../request/Api";
import { toast } from "../utils/Toast";
import { useDocument } from "../contents/DocumentProvider";
import { v4 as uuidv4 } from 'uuid';

export const AllowanceDeductionReadOnly = ({data, availableData, onOpen, onDelete, onTaxExemption}) =>{
    const { allowanceDeductionIdLinks } = useDocument();

    const [options, setOptions] = useState([]);
    const [radioName, setRadioName] = useState();

    const overlayRef = useRef();

    const onOpenOverlay = (e) =>{
        e.stopPropagation();
        onCloseOverlayAll();
        $(overlayRef.current).show('fast');
    }

    const onOverlayClose = () =>{
        $(overlayRef.current).hide('fast');
    }

    const onCloseOverlayAll = () =>{
        $('[data-allowance-setting-overlay]').hide('fast');
    }

    const onSetLink = (opt) =>{
        if(!data?.id) return;
        api.allowanceDeductionIdLink.set(data.id, opt.cmd).then((response)=>{

        }).catch((error)=>{
            toast.error('Allowance and Deduction links', error);
        });
    }

    const onDeleteLink = () =>{
        if(!data?.id) return;
        api.allowanceDeductionIdLink.delete(data.id).then((response)=>{

        }).catch((error)=>{
            toast.error('Allowance and Deduction links', error);
        });
    }

    useEffect(()=>{
        if(!allowanceDeductionIdLinks) return;
        let tempOptions = [];
        Object.keys(allowanceDeductionIdLinks || {}).forEach((key)=>{
            tempOptions.push(allowanceDeductionIdLinks[key]);
        });
        setOptions(tempOptions);
    }, [allowanceDeductionIdLinks]);

    useEffect(()=>{
        if(!availableData?.length || !data || !options.length) return;
        setTimeout(() => {
            availableData.forEach((opt)=>{
                if(opt.id === data.id){
                    const select = $(overlayRef.current).find(`input[data-cmd=${opt.attributes.cmd}]`);
                    if(select.length) select[0].checked = true;
                }
            });
            const checkbox = $(overlayRef.current).find('input[type=checkbox]');
            if(checkbox.length) checkbox[0].checked = !!data?.attributes?.taxExemption;
        }, 500);
    }, [data, availableData, options]);

    useEffect(()=>{
        setRadioName(uuidv4());
        $(document).on('click', ()=>onOverlayClose());
    }, []);

    return(
        <div className="user-select-none" data-read-only="">
            <div onClick={onCloseOverlayAll} className="d-flex align-items-center position-relative border w-100 bg-light">
                <div className='d-flex align-items-center w-100 px-2 py-1'>
                    <div className='w-50'>
                        <div className="fw-bold small p-0 m-0"><small>Name:</small></div>
                        <div className="text-truncate" style={{marginTop: '-5px'}} data-name="">{data?.attributes?.name}</div>
                    </div>
                    <div className="ms-3 w-50">
                        <div className="fw-bold small p-0 m-0"><small>Type:</small></div>
                        <div className="text-truncate" style={{marginTop: '-5px'}} data-type="">{data?.attributes?.type}</div>
                    </div>
                    <div className="ms-3 w-50">
                        <div className="fw-bold small p-0 m-0"><small>Amount:</small></div>
                        <div className="text-truncate" style={{marginTop: '-5px'}} data-amount="">{data?.attributes?.amount}</div>
                    </div>
                </div>
                <div className="d-flex align-items-center px-2">
                    <button onClick={onOpen} className="btn btn-sm btn-outline-primary px-4 py-0">Edit</button>
                    <button onClick={onDelete} className="btn btn-sm btn-outline-danger px-3 ms-2 py-0">Delete</button>
                    <button onClick={onOpenOverlay} className="d-flex align-items-center ms-2 p-0 border-0 pointer"><TbSettingsUp/></button>
                </div>
                <div ref={overlayRef} onClick={(e)=>e.stopPropagation()} className="position-absolute end-0 top-100 me-1 p-2 bg-white border border-top-0" style={{display: 'none', zIndex: '999999'}} data-allowance-setting-overlay="">
                    {onTaxExemption ? <div className="small">Set tax exemption</div>: null}
                    {onTaxExemption ? <div className="my-2 list-item">
                        <label className="d-flex align-items-center pointer w-100 rounded-1 px-2 pt-0">
                            <input onChange={onTaxExemption} className="form-check-input bg-info bg-lightgray me-2 mt-0" type="checkbox" defaultChecked={true} />
                            <div className="w-100 text-start mt-0">Tax exemption</div>
                        </label>
                    </div>: null}
                    {onTaxExemption ? <hr></hr>: null}
                    <div className="small">Link requirements</div>
                    <div className="my-2 list-item">
                        <label className="d-flex align-items-center pointer w-100 rounded-1 px-2 pt-0">
                            <input onChange={()=>onDeleteLink()} className="form-check-input bg-info bg-lightgray me-2 mt-0" type="radio" name={radioName} defaultChecked={true} />
                            <div className="w-100 text-start mt-0">None</div>
                        </label>
                    </div>
                    {options?.map((opt, key)=>(
                        <div className="my-2 list-item" key={key}>
                            <label className="d-flex align-items-center pointer w-100 rounded-1 px-2 pt-0">
                                <input onChange={()=>onSetLink(opt)} className="form-check-input bg-info bg-lightgray me-2 mt-0" type="radio" name={radioName} data-cmd={opt.cmd} />
                                <div className="w-100 text-start mt-0">{opt.message}</div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {data?.attributes?.rate?
            <div className="d-flex align-items-center w-100 small px-2">
                <div className="bg-white text-info border-bottom border-start text-truncate ps-2" style={{width: '150px'}} data-rate="">Rate: {data?.attributes?.rate}</div>
                <div className="bg-white text-info border-bottom border-end text-truncate" style={{width: '150px'}} data-rate-amount="">Amount: {data?.attributes?.rateAmount}</div>
            </div>:null}
        </div>
    )
}