import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

export const AlertOverlay = ({isOpen, onClose, title, description}) =>{
    if(!isOpen) return null;
    return(
        <div className="backdrop position-fixed top-0">
            <div className="position-absolute start-50 top-0 translate-middle-x" style={{marginTop: '200px'}}>
                <div className="bg-white shadow rounded-3 p-3 h-auto" onClick={e=>e.stopPropagation()}>
                    <div className="h5 border-bottom pb-2"><FiAlertTriangle className="text-warning me-2" />{title}</div>
                    <div className="bg-light rounded-3 p-3">
                        <div className="py-1">{description}</div>
                        <div className="mt-3 text-end">
                            <button onClick={onClose} className="btn btn-sm btn-dark">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}