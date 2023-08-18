import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { reportPayload } from "../utils/ReportPayload";
import { toast } from "../utils/Toast";
import { Report } from "../components/Report";
import { routes } from "../router/routes";

export const CreateEmployeeReport = () =>{
    const [user, setUser] = useState();

    const params = useParams();
    const navigate = useNavigate();

    const onSubmit = () =>{
        console.log({
            percentageOfSalary: '',
            includeSalary: false,
            inludeAllowances: [],
            inludeDeductions: []
        });
        const data = reportPayload.payload().first();
        api.report.create(data).then((response)=>{
            toast.success(user?.attributes?.name + ' Report', 'Created');
            navigate(routes.workspace().nested().employeePayslip(response.data.data[0].id));
        }).catch((error)=>{
            console.log(error);
            toast.error(user?.attributes?.name + ' Report', error);
        });
    }

    return(
        <Report title={'Customerized Salary Report'} userId={params?.userId} onUser={setUser}>
            <button onClick={onSubmit} className="btn btn-primary btn-success">Submit</button>
        </Report>
    )
}