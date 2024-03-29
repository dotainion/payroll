import React from "react";
import logo from '../../images/logo-icon.png';
import { useAuth } from "../../auth/AuthProvider";

export const PayslipHead = ({report}) =>{
    const { business } = useAuth();
    return(
        <div>
            <input value={report?.id} name="reportId" hidden onChange={()=>{}} style={{display: 'none'}} />
            <input value={report?.attributes?.user?.id} name="userId" hidden onChange={()=>{}} style={{display: 'none'}} />
            <div className="text-end fw-bold">{business?.attributes?.name}</div>
            <div className="d-flex align-items-center w-100">
                <div className="w-100">
                    <img src={logo} alt=""/>
                </div>
                <div className="w-100">
                    <div className="text-end">{business?.attributes?.state}</div>
                    <div className="text-end">{business?.attributes?.city}</div>
                </div>
            </div>
            <div className="text-center border-bottom mb-2">Payroll {new Date(report?.attributes?.date).toDateString()}</div>

            <div className="d-flex w-100">
                <div className="d-flex align-items-center w-100">
                    <div className="me-3">Name:</div>
                    <div className="fw-bold">{report?.attributes?.user?.attributes?.name}</div>
                </div>
                <div className="d-flex align-items-center w-100">
                    <div className="me-3">Position:</div>
                    <div className="fw-bold"></div>
                </div>
            </div>

            <div className="d-flex w-100">
                <div className="d-flex align-items-center w-100">
                    <div className="me-3">ID:</div>
                    <div className="fw-bold">{report?.id?.split?.('-')?.[report?.id?.split?.('-')?.length -1]}</div>
                </div>
                <div className="d-flex align-items-center w-100">
                    <div className="me-3">Cagegory:</div>
                    <div className="fw-bold">EMPLOYEE REPORT</div>
                </div>
            </div>

            <div className="d-flex w-100">
                <div className="d-flex align-items-center w-100">
                    <div className="me-3">Employee No:</div>
                    <div className="fw-bold">{report?.attributes?.user?.attributes?.userId}</div>
                </div>
                <div className="d-flex align-items-center w-100">
                    <div className="me-3">Department:</div>
                    <div className="fw-bold">{report?.attributes?.user?.attributes?.department}</div>
                </div>
            </div>

            <div className="d-flex w-100">
                <div className="d-flex align-items-center w-100">
                    <div className="me-3">Period:</div>
                    <div className="fw-bold">{new Date(report?.attributes?.periodFrom).toDateString()}</div>
                    <div className="mx-2">-</div>
                    <div className="fw-bold">{new Date(report?.attributes?.periodTo).toDateString()}</div>
                </div>
                <div className="d-flex align-items-center w-100">
                    <div className="me-3">Payroll Set:</div>
                    <div className="fw-bold">MONTHLY PAYROLL</div>
                </div>
            </div>

            {
                report?.attributes?.prorate !== null ?
                <div className="d-flex w-100 mb-3">
                    <div className="me-3">Prorate:</div>
                    <div className="me-3">{new Date(report?.attributes?.prorate?.attributes?.from).toDateString()}</div>
                    <div className="mx-2">-</div>
                    <div>{new Date(report?.attributes?.prorate?.attributes?.to).toDateString()}</div>
                </div>
                : null
            }
            <div className="mb-3"></div>
        </div>
    )
}