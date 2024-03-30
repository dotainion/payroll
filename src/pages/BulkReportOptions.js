import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";
import { MdLibraryBooks } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { ReportOptionsHeader } from "../components/ReportOptionsHeader";

export const BulkReportOptions = () =>{
    const navigate = useNavigate();
    return(
        <div className="container">
            <div className="h3 fw-bold mt-3">Bulk Report</div>
            <ReportOptionsHeader />
            <div className="mt-2 mb-4 bg-white p-3 small">
                <div>This payroll system is the ideal payroll solution for any businesses. It has been designed to ensure that complicated payroll procedures are simplified and performed by a click of a button.</div>
                <div>It is a single user application that allows you to created unlimited employee records. Employees can be paid monthly or bi-monthly.</div>
            </div>
            <div className="bulk-report-option my-4">
                <button onClick={()=>navigate(routes.workspace().nested().bulkReport())} className="shadow btn btn-light border border-dark py-4 me-2">
                    <div className="h-100">
                        <div className="mb-3">
                            <MdLibraryBooks className="display-3" />
                        </div>
                        <span>Generate bulk report from the last payroll report generated</span>
                    </div>
                </button>
                <button onClick={()=>navigate(routes.workspace().nested().generateBulkReportForUsers())} className="shadow btn btn-light border border-dark py-4 ms-2">
                    <div className="h-100">
                        <div className="mb-3">
                            <BiSolidReport className="display-3" />
                        </div>
                        <span>Generate bulk report</span>
                    </div>
                </button>
            </div>
        </div>
    )
}