import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../request/Api";
import { reportPayload } from "../utils/ReportPayload";
import { toast } from "../utils/Toast";
import { ReportInstance } from "../components/ReportInstance";

export const EditEmployeeReport = () =>{
    const [user, setUser] = useState();
    const [retport, setReport] = useState();
    const [loading, setLoading] = useState(true);

    const timeoutRef = useRef();

    const params = useParams();

    const onSubmit = () =>{
        const data = {
            reportId: params?.reportId,
            ...reportPayload.payload().first(),
        }
        console.log(data);
        api.report.edit(data).then((response)=>{
            toast.success(user?.attributes?.name + ' Report', 'Edited');
        }).catch((error)=>{
            console.log(error);
            toast.error(user?.attributes?.name + ' Report', error);
        });
    }

    const onAllowanceDelete = (callback, id) =>{
        api.allowance.deleteReport(id).then(()=>{
            callback();
            onSubmit();
        }).catch((error)=>{
            toast.error('Allowance', error);
        });
    }

    const onDeductionDelete = (callback, id) =>{
        api.deduction.deleteReport(id).then(()=>{
            callback();
            onSubmit();
        }).catch((error)=>{
            toast.error('Deduction', error);
        });
    }

    useEffect(()=>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.report.report(params?.reportId).then((response)=>{
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
                        onAllowanceRemove={onAllowanceDelete}
                        onDeductionRemove={onDeductionDelete}
                    >
                        <button onClick={onSubmit} className="btn btn-primary btn-success">Submit</button>
                    </ReportInstance>
            }
        </>
    )
}