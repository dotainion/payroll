import React from "react";

export const UpcomingPayroll = () =>{
    return(
        <div className="bg-white shadow rounded-3 p-3">
            <div className="border-2 border-bottom fw-bold pb-3 mb-2">Upcoming payroll</div>
            <div className="d-flex">
                <div>
                    <div className="d-flex align-items-center">
                        <div className="h4">Weekly</div>
                        <div className="bg-light rounded-3 small ms-3 px-2 shadow-sm">Due in 5 days</div>
                    </div>
                    <div className="d-flex my-3">
                        <div className="me-1 rounded-3 bg-light p-2 shadow-sm">
                            <div className="small">Check date</div>
                            <div className="fw-bold">11/21/2024</div>
                        </div>
                        <div className="ms-1 rounded-3 bg-light p-2 shadow-sm">
                            <div className="small">Pay period</div>
                            <div className="fw-bold">11/13 - 11/19</div>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-dark w-100 shadow">Run payroll</button>
                </div>
                <div className="mx-3 border"></div>
                <div className="text-nowrap">
                    <div className="mb-2 small fw-bold">Payroll actions</div>
                    <button className="btn btn-sm btn-dark w-100 my-1 shadow d-block">New off cycle payroll</button>
                    <button className="btn btn-sm btn-dark w-100 my-1 shadow d-block">Calculate paycheck</button>
                </div>
            </div>
        </div>
    )
}