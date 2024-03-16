import React, { memo, useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from 'jquery';
import { routes } from "../router/routes";
import { useNavigate } from "react-router-dom";
import { BiCalendar } from "../components/BiCalendar";
import { Dropdown } from "react-bootstrap";
import { EllipsisOption } from "../widgets/EllipsisOption";
import { FiEdit } from "react-icons/fi";
import { BiSolidReport } from "react-icons/bi";
import { ReportExpandableColumn } from "../components/ReportExpandableColumn";
import { PageNavbar } from "../components/PageNavbar";
import { api } from "../request/Api";
import { useDocument } from "../contents/DocumentProvider";
import { BsArrowsExpand } from "react-icons/bs";
import { BsArrowsCollapse } from "react-icons/bs";
import { DateHelper } from "../utils/DateHelper";

const mockData = [{"id":"e1821713-6437-431e-8f30-14a07ae21d39","type":"report","attributes":{"hide":false,"userId":"dbe82072-33cc-41d0-ac26-a41545698862","user":{"id":"dbe82072-33cc-41d0-ac26-a41545698862","type":"user","attributes":{"userId":"123","name":"Nick Blair","email":"mb.repairss@gmail.com","hide":false,"gender":"Male","number":"1234","token":null,"emergencyNumber":"1234","registrationDate":"2023-09-13 00:00:00","salary":"2000","dob":"2023-09-13 00:00:00","taxId":"252525","nisId":"12345678","otRate":"25","city":"Saint Andrew","state":"Grenada","address":"tempe","department":"Information Technology"}},"totalDeduction":"217099.50","totalAllowance":"726665.00","totalSalary":"2000.00","net":"511565.50","netSalary":"511565.50","date":"2024-03-04 19:43:30","ytd":"547243.5","periodFrom":"2024-03-01 00:00:00","periodTo":"2024-03-31 00:00:00","allAllowances":[{"id":"78884818-8cff-452a-8dde-445b38cef386","type":"allowance","attributes":{"reportId":"e1821713-6437-431e-8f30-14a07ae21d39","ytd":"114747","net":"52222","number":null,"linkId":null,"name":"nick","type":"3","rate":"","date":"2024-03-04 19:43:30","hide":false,"amount":"52222","rateAmount":"","totalAmount":"52222"}},{"id":"be3a80af-503f-460b-8794-3e7d0f60d075","type":"allowance","attributes":{"reportId":"e1821713-6437-431e-8f30-14a07ae21d39","ytd":"21555","net":"5555","number":null,"linkId":null,"name":"mall","type":"3","rate":"","date":"2024-03-04 19:43:30","hide":false,"amount":"5555","rateAmount":"","totalAmount":"5555"}},{"id":"3aaf52a9-f072-44fe-966f-6b11601283b4","type":"allowance","attributes":{"reportId":"e1821713-6437-431e-8f30-14a07ae21d39","ytd":"671112","net":"668888","number":null,"linkId":null,"name":"Bundle","type":"3","rate":"","date":"2024-03-04 19:43:30","hide":false,"amount":"668888","rateAmount":"","totalAmount":"668888"}}],"allDeductions":[{"id":"b6d88503-e917-4ca7-9659-2609f19c6f41","type":"tax","attributes":{"userId":"dbe82072-33cc-41d0-ac26-a41545698862","reportId":"e1821713-6437-431e-8f30-14a07ae21d39","ytd":"18093941.7","net":"217099.5","name":"Tax deduction","number":"252525","date":"2024-03-04 19:43:30","hide":false,"amount":"217099.5"}}]}},{"id":"9ebaa458-1350-4955-8991-aac7a8d48286","type":"report","attributes":{"hide":false,"userId":"5ef91e9d-2853-465b-97fd-f66ab1d339f3","user":{"id":"5ef91e9d-2853-465b-97fd-f66ab1d339f3","type":"user","attributes":{"userId":"10005","name":"Valeria Warren","email":"v.warren@randatmail.com","hide":false,"gender":"Female","number":"473-455-7583","token":null,"emergencyNumber":"","registrationDate":"2022-10-19 00:00:00","salary":"5500","dob":"1978-05-18 00:00:00","taxId":"121060","nisId":"242568","otRate":"35","city":"Saint David","state":"Grenada","address":"Westerhall","department":"Information Technology"}},"totalDeduction":"3459.51","totalAllowance":"357.50","totalSalary":"2838.71","net":"-436.29","netSalary":"-436.29","date":"2024-03-06 12:14:28","ytd":"-436.29","periodFrom":"2024-03-01 00:00:00","periodTo":"2024-03-16 00:00:00","allAllowances":[{"id":"28a62112-7d3a-428f-b244-ea1bd368ccab","type":"allowance","attributes":{"reportId":"9ebaa458-1350-4955-8991-aac7a8d48286","ytd":"357.5","net":"357.5","number":"242568","linkId":"5a5996d6-e6dd-4dd9-8c31-a43e0ab7b74b","name":"NIS","type":"2","rate":"","date":"2024-03-06 12:14:28","hide":false,"amount":"6.5","rateAmount":"","totalAmount":"357.5"}}],"allDeductions":[{"id":"7a5739bf-fa3b-40f0-80ab-25cfe0c723bb","type":"deduction","attributes":{"hide":false,"reportId":"9ebaa458-1350-4955-8991-aac7a8d48286","ytd":"715","net":"357.5","number":null,"linkId":null,"name":"NIS","date":"2024-03-06 12:14:28","type":"2","rate":"","amount":"6.5","rateAmount":"","totalAmount":"357.5"}},{"id":"167a87c3-846c-4fb9-8e8f-90d62aace1bc","type":"loanDeduction","attributes":{"hide":false,"userId":"5ef91e9d-2853-465b-97fd-f66ab1d339f3","ytd":"699","net":"350","name":"L.A.Purcell","date":"2024-03-06 12:14:28","number":"816687","amount":"350","reportId":"9ebaa458-1350-4955-8991-aac7a8d48286"}},{"id":"1e305a93-35b4-4e06-ae97-9f09dab43847","type":"loanDeduction","attributes":{"hide":false,"userId":"5ef91e9d-2853-465b-97fd-f66ab1d339f3","ytd":"149","net":"74","name":"Sagicor","date":"2024-03-06 12:14:28","number":"100979","amount":"74","reportId":"9ebaa458-1350-4955-8991-aac7a8d48286"}},{"id":"87474d95-d00e-49b0-8b74-4cf054824972","type":"loanDeduction","attributes":{"hide":false,"userId":"5ef91e9d-2853-465b-97fd-f66ab1d339f3","ytd":"65.5","net":"33","name":"MASA Air Ambulance","date":"2024-03-06 12:14:28","number":"755428","amount":"33","reportId":"9ebaa458-1350-4955-8991-aac7a8d48286"}},{"id":"679172f2-055b-4dd1-8654-b9ece5a681ca","type":"loanDeduction","attributes":{"hide":false,"userId":"5ef91e9d-2853-465b-97fd-f66ab1d339f3","ytd":"4587.5","net":"2292","name":"Grenada Cooperative Bank Limited","date":"2024-03-06 12:14:28","number":"552884","amount":"2292","reportId":"9ebaa458-1350-4955-8991-aac7a8d48286"}},{"id":"31f092c0-aebe-4862-a01d-8a9976be20d6","type":"tax","attributes":{"userId":"5ef91e9d-2853-465b-97fd-f66ab1d339f3","reportId":"9ebaa458-1350-4955-8991-aac7a8d48286","ytd":"353.01161290322","net":"146.50322580645","name":"Tax deduction","number":"121060","date":"2024-03-06 12:14:28","hide":false,"amount":"146.50322580645"}},{"id":"d004a5ff-ce78-40f2-bc74-58386300a202","type":"tax","attributes":{"userId":"5ef91e9d-2853-465b-97fd-f66ab1d339f3","reportId":"9ebaa458-1350-4955-8991-aac7a8d48286","ytd":"353.01161290322","net":"206.50838709677","name":"Tax deduction","number":"121060","date":"2024-03-06 12:14:28","hide":false,"amount":"206.50838709677"}}]}}]


const prev = new Date();
prev.setDate(prev.getDate() - 30);
const period = {
    from: new DateHelper(prev).toSqlString(), 
    to: new DateHelper(new Date()).toSqlString()
}

export const ViewReports = () =>{
    const { setLoading } = useDocument();

    const [reports, setReporst] = useState([...mockData]);
    const [users, setUsers] = useState([]);
    const [collapse, setCollapse] = useState(false);

    const navigate = useNavigate();

    const startRef = useRef();
    const endRef = useRef();
    const userRef = useRef();

    const searchByUser = useCallback(() =>{
        console.log('hello am waiting on me and u...');
        const userId = userRef.current.value;
        const from = startRef.current;
        const to = endRef.current;
        if(!from || !to) return;
        if(!userId){
            api.report.searchByDate(from, to).then((response)=>{
                setReporst(response.data.data);
            }).catch((error)=>{
                console.log(error);
                //setReporst([]);
            }).finally(()=>{
                setLoading(false);
            });
            return;
        }
        api.report.searchByDateAndUserId(from, to, userId).then((response)=>{
            setReporst(response.data.data);
        }).catch((error)=>{
            console.log(error);
            //setReporst([]);
        }).finally(()=>{
            setLoading(false);
        });
    });

    const onDateSelect = useCallback((start, end) =>{
        startRef.current = new DateHelper(start.dateInstance).toSqlString();
        endRef.current = new DateHelper(end.dateInstance).toSqlString();
        searchByUser();
    });

    useEffect(()=>{
        api.user.listUsers().then((response)=>{
            setUsers(response.data.data);
        }).catch((error)=>{

        });
    }, []);
    return(
        <div className="page bg-lightgray w-100">
            <PageNavbar/>
            <div onChange={searchByUser} className="container mb-3">
                <div className="allowance-row bg-transparent py-3" style={{width: '400px'}}>
                    <label>Period <span className="text-danger">*</span></label>
                    <BiCalendar period={period} onSelect={onDateSelect} biMonthlyOff fireOnLoad />
                </div>
                <div className="allowance-row bg-transparent py-3">
                    <label>Employees</label>
                    <select ref={userRef} className="form-control shadow-none pointer form-select">
                        <option value="">All</option>
                        {users.map((user, key)=>(
                            <option value={user.id} key={key}>{user.attributes.name}</option>
                        ))}
                    </select>
                </div>
                <div className="allowance-row bg-transparent py-3 text-nowrap" style={{width: '120px'}}>
                    <label onClick={()=>setCollapse(!collapse)}>
                        {collapse ? <button className="btn btn-sm btn-outline-dark"><BsArrowsCollapse /> Collaps All</button>
                        : <button className="btn btn-sm btn-outline-dark"><BsArrowsExpand /> Expand All</button>}
                    </label>
                </div>
            </div>
            <div className="">
                <table className="p-3 table table-white table-striped table-bordered text-nowrap">
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Net Salary</th>
                            <th>Allowance</th>
                            <th>Deduction</th>
                            <th>Tax Withheld</th>
                            <th>YTD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((rept, key)=>(
                            <tr className="table-row striped" key={key}>
                                <td>
                                    <EllipsisOption>
                                        <Dropdown.Item 
                                            onClick={()=>navigate(routes.workspace().nested().editReport(rept?.id))} 
                                            className="d-flex align-items-center"><FiEdit className="me-2"/>Edit</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={()=>navigate(routes.workspace().nested().employeePayslip(rept?.id))}
                                            className="d-flex align-items-center"><BiSolidReport className="me-2"/>Invoice</Dropdown.Item>
                                    </EllipsisOption>
                                </td>
                                <td>{new Date(rept?.attributes?.date).toDateString()}</td>
                                <td>{rept?.attributes?.user?.attributes?.name}</td>
                                <td><span className="fw-bold">$</span> {rept?.attributes?.totalSalary || 0}</td>
                                <td><span className="fw-bold">$</span> {rept?.attributes?.netSalary || 0}</td>
                                <td><ReportExpandableColumn items={rept?.attributes?.allAllowances} value={parseFloat(rept?.attributes?.totalAllowance || 0).toFixed(2)} collapse={collapse} /></td>
                                <td><ReportExpandableColumn items={rept?.attributes?.allDeductions} value={parseFloat(rept?.attributes?.totalDeduction || 0).toFixed(2)} collapse={collapse} /></td>
                                <td><TaxWithheld deductions={rept?.attributes?.allDeductions} collapse={collapse} /></td>
                                <td><span className="fw-bold">$</span> {parseFloat(rept?.attributes?.ytd || 0).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


const TaxWithheld = memo(({deductions, collapse}) =>{
    const [taxes, setTaxes] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        if(!deductions?.length) return;
        let value = 0;
        const taxDeductions = deductions?.filter?.((tax)=>{
            if(tax.type === 'tax'){
               value += parseFloat(tax?.attributes?.net);
               return true;
            }
            return false;
        });
        setTotal(value);
        setTaxes(taxDeductions);
    }, []);
    return(
        <ReportExpandableColumn items={taxes} value={total} collapse={collapse} />
    )
});