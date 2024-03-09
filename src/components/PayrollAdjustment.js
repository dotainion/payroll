import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

export const PayrollAdjustment = () =>{
    return(
        <div className="d-flex justify-content-center p-3">
            <div className="shadow" style={{width: '500px'}}>
                <div className="h4 fw-bold border-bottom p-3">Create Payroll Adjustment</div>
                <div className="d-flex w-100 mb-3">
                    <div className="w-100 p-3">
                        <div className="small">Employee</div>
                        <div className="mb-3">Charles Smith</div>
                        <div className="small">Adjustment Amount</div>
                        <div className="input-group">
                            <span className="input-group-text"><FaDollarSign /></span>
                            <input className="form-control shadow-none" type="number" />
                        </div>
                    </div>
                    <div className="w-100 p-3">
                        <div className="small">Posted On</div>
                        <div className="input-group">
                            <span className="input-group-text"><LuCalendarDays /></span>
                            <input className="form-control shadow-none" type="date" />
                        </div>
                    </div>
                </div>
                <div className="p-3">
                    <div className="small">Type</div>
                    <select className="form-control shadow-none">

                    </select>
                    <div className="small mt-3">Memo</div>
                    <textarea className="form-control shadow-none" style={{height: '150px', resize: 'none'}} />
                    <div className="border-top my-3 d-flex justify-content-between mt-4 pt-3">
                        <button className="btn btn-sm btn-secondary px-3">Cancel</button>
                        <button className="btn btn-sm btn-dark px-3">Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}