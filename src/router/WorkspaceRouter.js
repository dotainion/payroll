import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { WorkspaceLayout } from "../layout/WorkspaceLayout";
import { CreateEmployeeReport } from "../pages/CreateEmployeeReport";
import { EditEmployee } from "../pages/EditEmployee";
import { CreateEmployee } from "../pages/CreateEmployee";
import { Employees } from "../pages/Employees";
import { EmployeeReports } from "../pages/EmployeeReports";
import { Dashboard } from "../pages/Dashboard";
import { CreateBulkReportFromLastReports } from "../pages/CreateBulkReportFromLastReports";
import { EditEmployeeReport } from "../pages/EditEmployeeReport";
import { EmployeeSettings } from "../pages/EmployeeSettings";
import { EmployeePayslip } from "../invoices/pages/EmployeePayslip";
import { BulkPayslip } from "../invoices/pages/BulkPayslip";
import { EeachEmployeePayslip } from "../invoices/pages/EeachEmployeePayslip";
import { ViewReports } from "../pages/ViewReports";
import { TodoList } from "../pages/TodoList";
import { BulkReportOptions } from "../pages/BulkReportOptions";
import { GenerateBulkReportForUsers } from "../pages/GenerateBulkReportForUsers";
import { ApproveBulkReport } from "../pages/ApproveBulkReport";
import { EditEmployeePendingReport } from "../pages/EditEmployeePendingReport";
import { ReportApprovalConformation } from "../pages/ReportApprovalConformation";
import { ViewTaxReports } from "../pages/ViewTaxReports";

export const WorkspaceRouter = () =>{
    return(
        <WorkspaceLayout>
            <Routes>
                <Route path={routes.workspace().createReport()} element={<CreateEmployeeReport/>}/>
                <Route path={routes.workspace().editReport()} element={<EditEmployeeReport/>}/>
                <Route path={routes.workspace().editPendingReport()} element={<EditEmployeePendingReport/>}/>
                <Route path={routes.workspace().createEmployee()} element={<CreateEmployee/>}/>
                <Route path={routes.workspace().editEmployee()} element={<EditEmployee/>}/>
                <Route path={routes.workspace().employees()} element={<Employees/>}/>
                <Route path={routes.workspace().employeeReport()} element={<EmployeeReports/>}/>
                <Route path={routes.workspace().bulkReportOptions()} element={<BulkReportOptions/>}/>
                <Route path={routes.workspace().bulkReport()} element={<CreateBulkReportFromLastReports/>}/>
                <Route path={routes.workspace().generateBulkReportForUsers()} element={<GenerateBulkReportForUsers/>}/>
                <Route path={routes.workspace().approveBulkReport()} element={<ApproveBulkReport/>}/>
                <Route path={routes.workspace().reportApprovalConformation()} element={<ReportApprovalConformation/>}/>
                <Route path={routes.workspace().employeeSettings()} element={<EmployeeSettings/>}/>
                <Route path={routes.workspace().employeePayslip()} element={<EmployeePayslip/>}/>
                <Route path={routes.workspace().bulkPayslip()} element={<BulkPayslip/>}/>
                <Route path={routes.workspace().eachEmployeePayslip()} element={<EeachEmployeePayslip/>}/>
                <Route path={routes.workspace().viewReports()} element={<ViewReports/>}/>
                <Route path={routes.workspace().todoList()} element={<TodoList/>}/>
                <Route path={routes.workspace().viewTaxReports()} element={<ViewTaxReports/>}/>
                <Route path={routes.workspace().dashboard()} element={<Dashboard/>}/>
                <Route path={'*'} element={<Navigate to={routes.workspace().dashboard()}/>}/>
            </Routes>
        </WorkspaceLayout>
    )
}