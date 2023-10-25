import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { reportPayload } from "../utils/ReportPayload";
import { toast } from "../utils/Toast";
import { Report } from "../components/Report";
import { routes } from "../router/routes";
import $ from 'jquery';
import { useDocument } from "../contents/DocumentProvider";

export const CreateEmployeeReport = () =>{
    const {loading, setLoading} = useDocument();

    const [user, setUser] = useState();

    const params = useParams();
    const navigate = useNavigate();

    const onSubmit = async() =>{
        setLoading(true);

        const data = reportPayload.payload().first();
        console.log(data);
        api.report.create(data).then((response)=>{
            toast.success(user?.attributes?.name + ' Report', 'Created');
            navigate(routes.workspace().nested().employeePayslip(response.data.data[0].id));
        }).catch((error)=>{
            console.log(error);
            toast.error(user?.attributes?.name + ' Report', error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    return(
        <Report title={'Customerized Salary Report'} userId={params?.userId} onUser={setUser}>
            <button onClick={onSubmit} className="btn btn-primary btn-success" disabled={loading}>Submit</button>
        </Report>
    )
}