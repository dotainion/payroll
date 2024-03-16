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
            <div className="mt-2 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
            <div className="bulk-report-option my-4">
                <button onClick={()=>navigate(routes.workspace().nested().bulkReport())} className=" shadow btn btn-light border border-dark py-4 me-2">
                    <div className="h-100">
                        <div className="mb-3">
                            <MdLibraryBooks className="display-3" />
                        </div>
                        <span>Generate bulk report from the last payroll report generated</span>
                    </div>
                </button>
                <button onClick={()=>navigate(routes.workspace().nested().generateBulkReportForUsers())} className=" shadow btn btn-light border border-dark py-4 ms-2">
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