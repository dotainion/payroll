import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from "./routes";
import { WorkspaceLayout } from "../layout/WorkspaceLayout";
import { CreateEmployeeReport } from "../pages/CreateEmployeeReport";
import { EditEmployee } from "../pages/EditEmployee";
import { CreateEmployee } from "../pages/CreateEmployee";
import { Employees } from "../pages/Employees";
import { EmployeeReports } from "../pages/EmployeeReports";
import { EmployeeDefault } from "../pages/EmployeeDefault";
import { CreateBulkReport } from "../pages/CreateBulkReport";
import { EditEmployeeReport } from "../pages/EditEmployeeReport";
import { EmployeeSettings } from "../pages/EmployeeSettings";
import { EmployeePayslip } from "../invoices/pages/EmployeePayslip";
import { BulkPayslip } from "../invoices/pages/BulkPayslip";
import { EeachEmployeePayslip } from "../invoices/pages/EeachEmployeePayslip";
import { ViewReports } from "../pages/ViewReports";
import { TodoList } from "../pages/TodoList";

export const WorkspaceRouter = () =>{
    return(
        <WorkspaceLayout>
            <Routes>
                <Route path={routes.workspace().createReport()} element={<CreateEmployeeReport/>}/>
                <Route path={routes.workspace().editReport()} element={<EditEmployeeReport/>}/>
                <Route path={routes.workspace().createEmployee()} element={<CreateEmployee/>}/>
                <Route path={routes.workspace().editEmployee()} element={<EditEmployee/>}/>
                <Route path={routes.workspace().employees()} element={<Employees/>}/>
                <Route path={routes.workspace().employeeReport()} element={<EmployeeReports/>}/>
                <Route path={routes.workspace().bulkReport()} element={<CreateBulkReport/>}/>
                <Route path={routes.workspace().employeeSettings()} element={<EmployeeSettings/>}/>
                <Route path={routes.workspace().employeePayslip()} element={<EmployeePayslip/>}/>
                <Route path={routes.workspace().bulkPayslip()} element={<BulkPayslip/>}/>
                <Route path={routes.workspace().eachEmployeePayslip()} element={<EeachEmployeePayslip/>}/>
                <Route path={routes.workspace().viewReports()} element={<ViewReports/>}/>
                <Route path={routes.workspace().todoList()} element={<TodoList/>}/>
                <Route path={routes.workspace().default()} element={<Navigate to={routes.workspace().default()}/>}/>
                <Route path={'*'} element={<EmployeeDefault/>}/>
            </Routes>
        </WorkspaceLayout>
    )
}