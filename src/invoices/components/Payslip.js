import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { PayslipHead } from "./PayslipHead";

export const Payslip = ({report}) =>{
    const { user } = useAuth();

    const invoiceRef = useRef();

    return(
        <div ref={invoiceRef} className="payslip p-3" data-payslip="">
            <PayslipHead report={report} />

            <table className="table table-sm table-white table-bordered text-nowrap">
                <thead>
                    <tr>
                        <th>Allowance</th>
                        <th>Number</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>YTD</th>
                    </tr>
                </thead>
                <tbody>
                    {report?.attributes?.allAllowances?.map((item, key)=>(
                        <tr key={key}>
                            <td>{item?.attributes?.name}</td>
                            <td>{item?.attributes?.number}</td>
                            <td>{item?.attributes?.rate}</td>
                            <td>{item?.attributes?.net}</td>
                            <td>{item?.attributes?.ytd}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="table table-sm table-white table-bordered text-nowrap">
                <thead>
                    <tr>
                        <th>Deduction</th>
                        <th>Number</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>YTD</th>
                    </tr>
                </thead>
                <tbody>
                    {report?.attributes?.allDeductions?.map((item, key)=>(
                        <tr key={key}>
                            <td>{item?.attributes?.name}</td>
                            <td>{item?.attributes?.number}</td>
                            <td>{item?.attributes?.rate}</td>
                            <td>{item?.attributes?.net}</td>
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
                        <td className="border-0"><b>{report?.attributes?.netSalary}</b></td>
                        <td className="border-0"><b>{report?.attributes?.ytd}</b></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}