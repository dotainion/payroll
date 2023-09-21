import React, { useEffect, useState } from "react";
import logo from '../../images/logo-icon.png';
import { PayslipHead } from "./PayslipHead";
import { useWorkspace } from "../../layout/WorkspaceLayout";
import { PayslipItemizeHead } from "./PayslipItemizeHead";

export const PayslipItemize = ({reports}) =>{
    const { payslipPages } = useWorkspace();

    const [listReports, setListReports] = useState([]);

    const toTotalAmount = (itemize) =>{
        let total = 0;
        itemize?.list?.forEach((item)=>{
            total = total + parseFloat(item?.attributes?.amount);
        });
        return total;
    }

    const toTotalRate = (itemize) =>{
        let total = 0;
        itemize?.list?.forEach((item)=>{
            total = total + parseFloat(item?.attributes?.ytd);
        });
        return total;
    }

    useEffect(()=>{
        let options = {};
        if(payslipPages === 'itemize'){
            reports?.forEach((report)=>{
                report?.attributes?.allAllowances?.forEach((item)=>{
                    if(!options?.[item?.type]) options[item?.type] = [];
                    item.attributes.userName = report?.attributes?.user?.attributes?.name;
                    options[item?.type].push(item);
                });
                report?.attributes?.allDeductions?.forEach((item)=>{
                    if(!options?.[item?.type]) options[item?.type] = [];
                    item.attributes.userName = report?.attributes?.user?.attributes?.name;
                    options[item?.type].push(item);
                });
            });
        }else{
            reports?.forEach((report)=>{
                report?.attributes?.allAllowances?.forEach((item)=>{
                    if(payslipPages === item?.type){
                        if(!options?.[item?.type]) options[item?.type] = [];
                        item.attributes.userName = report?.attributes?.user?.attributes?.name;
                        options[item?.type].push(item);
                    }
                });
                report?.attributes?.allDeductions?.forEach((item)=>{
                    if(payslipPages === item?.type){
                        if(!options?.[item?.type]) options[item?.type] = [];
                        item.attributes.userName = report?.attributes?.user?.attributes?.name;
                        options[item?.type].push(item);
                    }
                });
            });
        }

        let reportTempList = [];
        Object.keys(options || {}).forEach((key)=>{
            reportTempList.push({list: options[key]});
        });
        
        setListReports(reportTempList);
    }, [reports, payslipPages]);

    return(
        <div data-payslip="">
            {listReports.map((itemize, key)=>(
                <div className="border border-5 border-primary mb-3 p-3" key={key}>
                    <PayslipItemizeHead report={itemize?.report} />
                    <table className="table table-sm table-white table-bordered text-nowrap">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>{itemize?.list?.[0]?.type}</th>
                                <th>Rate</th>
                                <th>Amount</th>
                                <th>YTD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemize?.list?.map((item, key2)=>(
                                <tr key={key2}>
                                    <td>{item?.attributes?.userName}</td>
                                    <td>{item?.attributes?.name}</td>
                                    <td>{item?.attributes?.rate}</td>
                                    <td>{item?.attributes?.net}</td>
                                    <td>{item?.attributes?.ytd}</td>
                                </tr>
                            ))}
                            <tr className="border-0">
                                <td className="border-0" colSpan={3}></td>
                                <td className="border-0"><b>{toTotalAmount(itemize)}</b></td>
                                <td className="border-0"><b>{toTotalRate(itemize)}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}