import React from "react";

export const LoadingSpinner = ({isActive}) =>{
    const onClick = (e) =>{
        e.preventDefault();
    }

    if(!isActive) return null;
    return(
        <>
            <div className="position-absolute w-100 h-100 z-index-1" onClick={onClick}></div>
            <div className="position-absolute start-50 top-50 translate-middle z-index-1" onClick={onClick}>
                <div className="spin position-relative rounded-circle d-inline-block" style={{transform: 'translateX(-50%)'}}>
                    <div className="move-hv-top-left position-absolute bg-success opacity-100 rounded-circle p-1 top-0 start-0"></div>
                    <div className="move-hv-top-right position-absolute bg-danger opacity-100 rounded-circle p-1 top-0 end-0"></div>
                    <div className="move-hv-bottom-left position-absolute bg-warning opacity-100 rounded-circle p-1 bottom-0 start-0"></div>
                    <div className="move-hv-bottom-right position-absolute bg-primary opacity-100 rounded-circle p-1 bottom-0 end-0"></div>
                </div>
                <div className="mt-3 text-nowrap">
                    <div className="position-absolute translate-middle-x">
                        <div className="text-dark">Please wait...</div>
                    </div>
                </div>
            </div>
        </>
    )
}