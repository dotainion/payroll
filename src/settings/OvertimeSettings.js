import React, { useEffect, useRef, useState } from "react";
import { FcCalendar, FcMoneyTransfer } from "react-icons/fc";
import { FaQuestionCircle } from 'react-icons/fa';
import $ from 'jquery';
import { api } from "../request/Api";
import { ErrorResponseHandler } from "../utils/ErrorResponseHandler";
import { Loading } from "../components/Loading";
import { Tooltip } from "../container/Tooltip";

export const OvertimeSettings = ({settings}) =>{
    const [showDeleting, setShowDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showCalculation, setShowCalculation] = useState(false);

    const optionContainerRef = useRef();
    const targetInputRef = useRef();
    const tempHtmlRef = useRef();
    const equalRef = useRef();
    const prefixRef = useRef();
    const suffixRef = useRef();
    const operatorRef = useRef();
    const idRef = useRef(null);
    const onRef = useRef();
    const nameRef = useRef();
    const overtimePageRef = useRef();
    const timeoutRef = useRef();

    //time and a half
    //double time
    const options = [
        {
            icon: FcMoneyTransfer,
            value: 'salary',
            display: 'Salary',
            tooltip: 'Salary will be extracted from the user to be replace with this placeholder.'
        },{
            icon: FcCalendar,
            value: 'calendar',
            display: 'Calendar days',
            tooltip: 'The number of day in the month will be use to replace with this placeholder.'
        },
    ];

    const setOvertimeSetting = () =>{
        setErrorMessage(null);
        let prefix = $(prefixRef.current).text();
        if($(prefixRef.current).find('svg').length) prefix = $(prefixRef.current).find('input').val();
        let suffix = $(suffixRef.current).text();
        if($(suffixRef.current).find('svg').length) suffix = $(suffixRef.current).find('input').val();

        const data = {
            id: idRef.current, 
            name: nameRef.current.value,
            active: onRef.current.checked,
            prefix: prefix,
            suffix: suffix,
            operator: $(operatorRef.current).val()
        }

        api.overtime.setOTSetting(data).then((response)=>{
            idRef.current = response.data.data[0].id;
        }).catch((error)=>{
            onRef.current.checked = false;
            onTurnOn({target: {checked: onRef.current.checked}});
            setErrorMessage(new ErrorResponseHandler().message(error));
        });
    }

    const onSet = () =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setOvertimeSetting();
        }, 500);
    }

    const onTurnOn = (e) =>{
        if(e.target.checked) $(onRef.current).parent().find('div').text('On');
        else $(onRef.current).parent().find('div').text('Off');
    }

    const onFocus = (e) =>{
        targetInputRef.current = e.target;
        $(optionContainerRef.current).children().removeClass('opacity-25');
    }

    const onBlur = (e) =>{
        targetInputRef.current = e.target;
        $(optionContainerRef.current).children().addClass('opacity-25');
        $(prefixRef.current).attr('contentEditable', true);
        $(suffixRef.current).attr('contentEditable', true);
        onSet();
    }

    const optionSelected = (e) =>{
        $(targetInputRef.current).focus();
        const title = $(e.currentTarget).find('span[data-value]').text();
        const clone = $(e.currentTarget).find('svg[data-icon]').clone();
        const value = $(e.currentTarget).find('span').attr('data-value');
        const container = $(`<div class="d-flex align-items-center"><input value="${value}" hidden/></div>`);
        const option = container.append(clone, $('<small class="ms-2"/>').text(title));
        $(targetInputRef.current).html(option);
    }

    const onKeyDown = (e) =>{
        tempHtmlRef.current = $(e.currentTarget).children();
        const hasSvg = !!$(e.currentTarget).find('svg[data-icon]').length;
        if(e.key === 'Backspace' && hasSvg) return $(e.currentTarget).empty();
        if(e.key === 'Backspace') return;
        if(hasSvg) return e.preventDefault();
        if(e.key.toUpperCase() != e.key.toLowerCase()) return e.preventDefault();
    }

    const calculate = () =>{
        const prefix = $(prefixRef.current);
        const suffix = $(suffixRef.current);
        if(prefix.find('svg').length || suffix.find('svg').length || !prefix.text() || !suffix.text()){
            return setShowCalculation(false);
        }
        else setShowCalculation(true);
        setTimeout(() => {
            const prefixNum = parseFloat(prefix.text() || 0);
            const suffixNum = parseFloat(suffix.text() || 0);
            if($(operatorRef.current).val() === 'x') $(equalRef.current).text(prefixNum * suffixNum);
            else if($(operatorRef.current).val() === '-') $(equalRef.current).text(prefixNum - suffixNum);
            else if($(operatorRef.current).val() === '/') $(equalRef.current).text(prefixNum / suffixNum);
            else throw new Error('calculation operator not determined.');
        }, 50);
    }

    const cloneFromElement = (operan) =>{
        if(!operan.isValid) return;
        const elementToClone = $(optionContainerRef.current).find(`[data-value=${operan.value}]`).parent();
        optionSelected({currentTarget: elementToClone});
    }

    const onCloseHandler = () =>{
        if(!settings) return close();
        setShowDeleting(true);
        setErrorMessage(null);
        api.overtime.deleteOTSettings(idRef.current).then(()=>close()).catch((error)=>{
            setErrorMessage(new ErrorResponseHandler().message(error));
        }).finally(()=>{
            setShowDeleting(false);
        });
    }

    const close = () =>{
        $(overtimePageRef.current).hide('fast').promise().then((self)=>self.remove());
    }

    const tooltipClick = (e) =>{
        e.stopPropagation();
        $(targetInputRef.current).focus();
    }

    useEffect(()=>{
        if(!settings) return;
        idRef.current = settings.id;
        nameRef.current.value = settings.attributes.name;
        if(!settings.attributes.prefix.attributes.isNumber){
            targetInputRef.current = prefixRef.current;
            cloneFromElement(settings.attributes.prefix.attributes);
        }else{
            $(prefixRef.current).text(settings.attributes.prefix.attributes.value);
        }
        if(!settings.attributes.suffix.attributes.isNumber){
            targetInputRef.current = suffixRef.current;
            cloneFromElement(settings.attributes.suffix.attributes);
        }else{
            $(suffixRef.current).text(settings.attributes.suffix.attributes.value);
        }
        if(settings.attributes.active){
            onRef.current.checked = true;
            onTurnOn({target: {checked: onRef.current.checked}});
        }
        if(settings.attributes.operator.value){
            $(operatorRef.current).children().each((i, option)=>{
                if($(option).attr('value') === settings.attributes.operator.value) $(option).attr('selected', 'selected');
            });
        }
    }, [settings]);

    useEffect(()=>{
        $(overtimePageRef.current).show('slow');
        $(window).on('click', (e)=>{
            $(targetInputRef.current).blur();
            targetInputRef.current = null;
        });
    }, []);

    return(
        <div ref={overtimePageRef} onChange={onSet} className="position-relative border rounded user-select-none text-center px-2 py-4 mb-3" style={{display: 'none'}}>
            <button onClick={onCloseHandler} className="position-absolute top-0 end-0 btn btn-outline-danger border-0 p-0 px-2">X</button>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div ref={optionContainerRef} onClick={(e)=>e.stopPropagation()} className="bg-light py-3">
                {options.map((opt, key)=>(
                        <div onClick={optionSelected} className="bg-white border d-inline-block rounded pointer px-3 py-1 me-2 opacity-25" key={key}>
                            <span className="me-2" data-value={opt.value}>{opt.display}</span>
                            <opt.icon data-icon=""/>
                            <span onClick={tooltipClick} data-tooltip="">
                                <Tooltip title={opt.tooltip}>
                                    <FaQuestionCircle className="ms-2"/>
                                </Tooltip>
                            </span>
                        </div>
                ))}
            </div>
            <div className="border-bottom my-3"></div>
            <div onClick={(e)=>e.stopPropagation()} onInput={calculate} className="d-flex align-items-center">
                <div ref={prefixRef} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} className="form-control overtime-editable-div" contentEditable data-prefix></div>
                <select ref={operatorRef} className="form-control form-select mx-2 ps-2 w-auto" style={{paddingRight: '35px'}}>
                    <option value={'x'}>Multiply</option>
                    <option value={'-'}>Subtract</option>
                    <option value={'/'}>Divide</option>
                </select>
                <div ref={suffixRef} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} className="form-control overtime-editable-div" contentEditable data-suffix></div>
            </div>
            {showCalculation && <div>
                <div>=</div>
                <div ref={equalRef} className="form-control"></div>
            </div>}
            <input ref={nameRef} className="form-control mt-4" placeholder="Name..."/>
            <ul className="list-group mt-2">
                <li className="small list-group-item bg-light d-flex w-100">
                    <label className="d-flex align-items-center pointer w-100">
                        <input ref={onRef} onChange={onTurnOn} className="form-check-input bg-info bg-lightgray me-2" type="checkbox"/>
                        <div >Off</div>
                    </label>
                </li>
            </ul>
            <Loading show={showDeleting} text={'Please wait while this record is deleted...'}/>
        </div>
    )
}