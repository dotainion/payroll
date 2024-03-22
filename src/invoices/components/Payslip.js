import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { PayslipHead } from "./PayslipHead";

export const Payslip = ({report}) =>{
    const { user } = useAuth();

    const [totalAllowance, setTotalAllowance] = useState(0);
    const [totalDeduction, setTotalDeduction] = useState(0);
    const [totalAllowanceYtd, setTotalAllowanceYtd] = useState(0);
    const [totalDeductionYtd, setTotalDeductionYtd] = useState(0);

    const invoiceRef = useRef();

    useEffect(()=>{
        if(!report) return;

        let allowanceTotal = 0;
        let deductionTotal = 0;
        let allowanceTotalYtd = 0;
        let deductionTotalYtd = 0;

        report.attributes.allAllowances.forEach((item)=>{
            allowanceTotal += parseFloat(item.attributes.net);
            allowanceTotalYtd += parseFloat(item.attributes.ytd);
        });

        report.attributes.allDeductions.forEach((item)=>{
            deductionTotal += parseFloat(item.attributes.net);
            deductionTotalYtd += parseFloat(item.attributes.ytd);
        });

        setTotalAllowance(allowanceTotal);
        setTotalDeduction(deductionTotal);
        setTotalAllowanceYtd(allowanceTotalYtd);
        setTotalDeductionYtd(deductionTotalYtd);
    }, [report]);

    return(
        <div ref={invoiceRef} className="payslip p-3" data-payslip="">
            <PayslipHead report={report} />

            {report?.attributes?.allAllowances?.length ? 
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
                                <td>{parseFloat(item?.attributes?.net).toFixed(2)}</td>
                                <td>{parseFloat(item?.attributes?.ytd).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr className="border-0">
                            <td className="border-0" colSpan={3}></td>
                            <td className="border-0"><b>{totalAllowance.toFixed(2)}</b></td>
                            <td className="border-0"><b>{totalAllowanceYtd.toFixed(2)}</b></td>
                        </tr>
                    </tbody>
                </table> 
            : null}

            {report?.attributes?.allDeductions?.length ? 
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
                                <td>{parseFloat(item?.attributes?.net).toFixed(2)}</td>
                                <td>{parseFloat(item?.attributes?.ytd).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr className="border-0">
                            <td className="border-0" colSpan={3}></td>
                            <td className="border-0"><b>{totalDeduction.toFixed(2)}</b></td>
                            <td className="border-0"><b>{totalDeductionYtd.toFixed(2)}</b></td>
                        </tr>
                    </tbody>
                </table> 
            : null}

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
                        <td>{parseFloat(report?.attributes?.netSalary).toFixed(2)}</td>
                        <td>{report?.attributes?.user?.attributes?.department}</td>
                        <td>{report?.attributes?.user?.attributes?.userId}</td>
                        <td>{parseFloat(report?.attributes?.totalSalary).toFixed(2)}</td>
                        <td>{parseFloat(report?.attributes?.ytd).toFixed(2)}</td>
                    </tr>
                    <tr className="border-0">
                        <td className="border-0" colSpan={3}></td>
                        <td className="border-0"><b>{parseFloat(report?.attributes?.netSalary).toFixed(2)}</b></td>
                        <td className="border-0"><b>{parseFloat(report?.attributes?.ytd).toFixed(2)}</b></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}