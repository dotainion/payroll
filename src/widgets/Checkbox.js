import React, { useEffect, useRef, useState } from "react";

export const Checkbox = ({title, onTitle, offTitle, onChange, inputRef, defaultChecked, disabled}) =>{
    const [on, setOn] = useState(false);

    const checkboxRef = useRef();

    const onTriggerChange = () =>{
        const ref = inputRef?.current || checkboxRef.current;
        setOn(ref?.checked);
        onChange?.(ref);
    }

    useEffect(()=>{
        if(!defaultChecked) return;
        onTriggerChange();
    }, []);

    return(
        <label className={`d-flex align-items-center w-100 mt-1 ${disabled ? '' : 'btn btn-light pointer'}`}>
            <input 
                onChange={onTriggerChange}
                defaultChecked={defaultChecked}
                className="form-check-input bg-info bg-lightgray me-2"
                type="checkbox" ref={inputRef || checkboxRef}
                disabled={disabled}
            />
            <div>{title}</div>
            {on ? <div>{onTitle}</div> : <div>{offTitle}</div>}
        </label>
    )
}