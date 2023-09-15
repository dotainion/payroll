import React, { forwardRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

export const PasswordInput = forwardRef(({className, onChange, placeholder}, ref) =>{
    const [show, setShow] = useState(false);

    const onToggle = () =>{
        setShow(!show);
    }

    return(
        <div className="position-relative">
            <input ref={ref} onChange={onChange} className={className} placeholder={placeholder} style={{paddingRight: '35px'}} type={show ? 'text' : 'password'} required/>
            <div onClick={onToggle} className="position-absolute top-50 end-0 translate-middle-y fs-4 pe-2 pb-2 pointer">
                {show ? <AiFillEyeInvisible/> : <AiFillEye/>}
            </div>
        </div>
    )
});
