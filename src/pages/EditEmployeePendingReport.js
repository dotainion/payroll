import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { reportPayload } from "../utils/ReportPayload";
import { toast } from "../utils/Toast";
import { ReportInstance } from "../components/ReportInstance";
import { useDocument } from "../contents/DocumentProvider";
import { routes } from "../router/routes";

export const EditEmployeePendingReport = () =>{
    const { loading, setLoading } = useDocument();

    const [user, setUser] = useState();
    const [retport, setReport] = useState();

    const timeoutRef = useRef();

    const params = useParams();
    const navigate = useNavigate();

    const onSubmit = () =>{
        const data = {
            reportId: params?.reportId,
            ...reportPayload.payload().first(),
        }
        console.log(data);
        api.report.edit(data).then((response)=>{
            navigate(routes.workspace().nested().approveBulkReport());
        }).catch((error)=>{
            console.log(error);
            toast.error(user?.attributes?.name + ' Report', error);
        });
    }

    const cancel = () =>{
        navigate(routes.workspace().nested().approveBulkReport());
    }

    useEffect(()=>{
        setLoading(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.report.report(params?.reportId, false).then((response)=>{
                setReport(response.data.data[0]);
            }).catch((error)=>{
                console.log(error);
                toast.error(user?.attributes?.name + ' Report', error);
            }).finally(()=>{
                setLoading(false);
            });
        }, 100);
    }, []);

    return(
        <>
            {
                !loading &&
                    <ReportInstance 
                        title={'Customerized Salary Report'} 
                        onUser={setUser} 
                        report={retport}
                    >
                        <button onClick={onSubmit} className="btn btn-primary btn-success">Submit</button>
                        <button onClick={cancel} className="btn btn-dark btn-success ms-2">Cancel</button>
                    </ReportInstance>
            }
        </>
    )
}