import React, { useRef, useState } from "react";
import { useEffect } from "react";
import logo from '../../images/logo-icon.png';
import { useAuth } from "../../auth/AuthProvider";

export const Payslip = ({report, business}) =>{
    const { user } = useAuth();

    const invoiceRef = useRef();

    return(
        <div ref={invoiceRef} className="payslip p-3" data-payslip="">
            <input value={report?.id} name="reportId" hidden style={{display: 'none'}} />
            <input value={report?.attributes?.user?.id} name="userId" hidden style={{display: 'none'}} />
            <div className="text-end fw-bold">{business?.attributes?.name}</div>
            <div className="d-flex w-100">
                <div className="w-100">
                    <img src={logo} alt=""/>
                </div>
                <div className="w-100 fs-3 fw-bold">
                    <div>PAYSLIP</div>
                </div>
                <div className="w-100">
                    <img src={logo} alt=""/>
                </div>
                <div className="w-100">
                    <div className="text-end">{business?.attributes?.state}</div>
                    <div className="text-end">{business?.attributes?.city}</div>
                </div>
            </div>
            <div className="text-center border-bottom mb-2">Payroll {report?.attributes?.date?.split?.(' ')?.[0]}</div>

            <div className="d-flex w-100">
                <div className="w-100">
                    <div className="me-3">Name:</div>
                    <div className="fw-bold">{report?.attributes?.user?.attributes?.name}</div>
                </div>
                <div className="w-100">
                    <div className="me-3">Position:</div>
                    <div className="fw-bold"></div>
                </div>
            </div>

            <div className="d-flex w-100">
                <div className="w-100">
                    <div className="me-3">ID:</div>
                    <div className="fw-bold">{report?.id}</div>
                </div>
                <div className="w-100">
                    <div className="me-3">Cagegory:</div>
                    <div className="fw-bold">MONTHLY PERMANENT EMPLOYEES</div>
                </div>
            </div>

            <div className="d-flex w-100">
                <div className="w-100">
                    <div className="me-3">Employee No:</div>
                    <div className="fw-bold">{report?.attributes?.user?.attributes?.userId}</div>
                </div>
                <div className="w-100">
                    <div className="me-3">Department:</div>
                    <div className="fw-bold">{report?.attributes?.user?.attributes?.department}</div>
                </div>
            </div>

            <div className="d-flex w-100 mb-3">
                <div className="w-100">
                    <div className="me-3">Period Ended:</div>
                    <div className="fw-bold">{report?.attributes?.date?.split?.(' ')?.[0]}</div>
                </div>
                <div className="w-100">
                    <div className="me-3">Payroll Set:</div>
                    <div className="fw-bold">MONTHLY PAYROLL</div>
                </div>
            </div>

            <table className="table table-sm table-white table-bordered text-nowrap">
                <thead>
                    <tr>
                        <th>Allowance</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>YTD</th>
                    </tr>
                </thead>
                <tbody>
                    {report?.attributes?.allAllowances?.map((item, key)=>(
                        <tr key={key}>
                            <td>{item?.attributes?.name}</td>
                            <td>{item?.attributes?.rate}</td>
                            <td>{item?.attributes?.amount}</td>
                            <td>{item?.attributes?.ytd}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="table table-sm table-white table-bordered text-nowrap">
                <thead>
                    <tr>
                        <th>Deduction</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>YTD</th>
                    </tr>
                </thead>
                <tbody>
                    {report?.attributes?.allDeductions?.map((item, key)=>(
                        <tr key={key}>
                            <td>{item?.attributes?.name}</td>
                            <td>{item?.attributes?.rate}</td>
                            <td>{item?.attributes?.amount}</td>
                            <td>{item?.attributes?.ytd}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="table table-sm table-white table-bordered text-nowrap">
                <thead>
                    <tr>
                        <th>Nett Pay</th>
                        <th>Branch</th>
                        <th>Employee Number</th>
                        <th>Amount</th>
                        <th>YTD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{report?.attributes?.netSalary}</td>
                        <td>{report?.attributes?.user?.attributes?.department}</td>
                        <td>{report?.attributes?.user?.attributes?.userId}</td>
                        <td>{report?.attributes?.totalSalary}</td>
                        <td>{report?.attributes?.ytd}</td>
                    </tr>
                    <tr className="border-0">
                        <td className="border-0" colSpan={3}></td>
                        <td className="border-0"><b>{report?.attributes?.totalSalary}</b></td>
                        <td className="border-0"><b>{report?.attributes?.ytd}</b></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}