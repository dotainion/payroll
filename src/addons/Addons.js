import { useEffect, useRef } from "react";
import { IoClose} from 'react-icons/io5';
import { useDocument } from "../contents/DocumentProvider";
import { CostTypeAndRateHandler } from "../utils/CostTypeAndRateHandler";
import $ from 'jquery';

const typeHandler = new CostTypeAndRateHandler();
export const AddOn = ({onRemove, data}) =>{
    const { costTypes, rateTypes } = useDocument();
    
    const idRef = useRef();

    const timeoutRef = useRef();
    const addOnRef = useRef();

    const rateRef = useRef();
    const amountRef = useRef();

    const remove = (e) =>{
        if(data){
            const currentTarget = e.currentTarget;
            onRemove?.(()=>$(currentTarget).parent().parent().remove(), $(idRef.current).val());
        }else{
            $(e.currentTarget).parent().parent().remove();
        }
    }
    
    const onRateChange = (e) =>{
        const display = $(e.target).find(':selected').text();
        if(display === costTypes?.rate?.name){
            $(rateRef.current).show('fast');
            $(amountRef.current).attr('placeholder', 'Add rate');
        }else{
            $(rateRef.current).hide('fast');
            $(amountRef.current).attr('placeholder', 'Add amount');
            $(rateRef.current).find('input').val('');
        }
        const icon = $(amountRef.current).parent().find('span');
        if(display === costTypes?.percentage?.name){
            $(amountRef.current).after(icon.text('%'));
            $(amountRef.current).attr('placeholder', 'Add percentage amount');
        }else{
            $(amountRef.current).before(icon.text('$'));
        }
    }

    useEffect(()=>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            onRateChange({target: $(addOnRef.current).find('[name=type]')});
            if(!data) return;
            const typeValue = typeHandler.costDisplayToValue(data?.attributes?.type);
            $('select[name=type]').find(`option[value=${typeValue}]`).attr('selected', 'selected');
            const rateValue = typeHandler.rateDisplayToValue(data?.attributes?.rate);
            $('select[name=rate]').find(`option[value=${rateValue}]`).attr('selected', 'selected');
        }, 100);
    }, [data, costTypes, rateTypes]);

    return(
        <div ref={addOnRef} className="w-100" data-addon="">
            <div className="allowance-row border m-3">
                <input className="form-control shadow-none border-0" name="name" defaultValue={data?.attributes?.name} placeholder="Name of action"/>
                <div className="d-flex align-items-center mt-2">
                    <div className="me-2 w-100">
                        <select onChange={onRateChange} className="form-control form-select shadow-none" name="type" defaultValue={typeHandler.costDisplayToValue(data?.attributes?.type) || 'Select a type'}>
                            {[...Object.keys(costTypes || {})].map((type, key)=>(
                                <option value={costTypes[type].value} key={key}>{costTypes[type].name}</option>
                            ))}
                            <option hidden>Select a type</option>
                        </select>
                    </div>
                    <div className="w-100">
                        <div className="input-group">
                            <span className="input-group-text">@</span>
                            <input ref={amountRef} className="form-control shadow-none" name="amount" defaultValue={data?.attributes?.amount} placeholder="Add amount" type="number"/>
                        </div>
                    </div>
                </div>
                <div ref={rateRef} style={{display: 'none'}}>
                    <div className="d-flex align-items-center mt-2">
                        <div className="me-2 w-100">
                            <select className="form-control form-select shadow-none" name="rate" defaultValue={typeHandler.rateDisplayToValue(data?.attributes?.rate) || 'Select a rate'}>
                                {[...Object.keys(rateTypes || {})].map((type, key)=>(
                                    <option value={rateTypes[type].value} key={key}>{rateTypes[type].name}</option>
                                ))}
                                <option hidden>Select a rate</option>
                            </select>
                        </div>
                        <div className="w-100 ">
                            <input className="form-control shadow-none" name="rateAmount" type="number" defaultValue={data?.attributes?.rateAmount} placeholder="Add rate"/>
                        </div>
                    </div>
                </div>
                <span onClick={remove} className="close" title="Remove"><IoClose className="fs-4"/></span>
            </div>
            <input ref={idRef} hidden value={data?.id} name="id" onChange={()=>{}} />
        </div>
    )
}


export const ExistingAddOn = ({onRemove, data}) =>{
    useEffect(()=>{
        
    }, []);
    return(
        <AddOn data={data} onRemove={onRemove}/>
    )
}