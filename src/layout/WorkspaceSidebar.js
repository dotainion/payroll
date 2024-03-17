import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPeopleGroup, FaPerson } from 'react-icons/fa6';
import logo from '../images/logo.png';
import { MenuOption } from "../widgets/MenuOption";
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from "../router/routes";
import { FaClone } from "react-icons/fa";
import { TbReportSearch } from 'react-icons/tb';
import { useDocument } from "../contents/DocumentProvider";
import { HiDocumentReport } from "react-icons/hi";
import { RiTodoLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";

export const WorkspaceSidebar = () =>{
    const { previousHistory, addPreviousHistory } = useDocument();

    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        {
            title: 'GPC Payroll',
            list: [
                {
                    icon: FaPerson,
                    title: 'Create Employee',
                    active: location.pathname.includes(routes.workspace().createEmployee()),
                    onClick: ()=>navigate(routes.workspace().createEmployee())
                },{
                    icon: FaPeopleGroup,
                    title: 'Employees List',
                    active: location.pathname.includes(routes.workspace().employees()),
                    onClick: ()=>navigate(routes.workspace().employees())
                },{
                    icon: FaClone,
                    title: 'Generate Bulk Report',
                    active: location.pathname.includes(routes.workspace().bulkReportOptions()),
                    onClick: ()=>navigate(routes.workspace().bulkReportOptions())
                },{
                    icon: TbReportSearch,
                    title: 'View Payslip',
                    active: location.pathname.includes(routes.workspace().bulkPayslip()),
                    onClick: ()=>navigate(routes.workspace().bulkPayslip())
                },{
                    icon: HiDocumentReport,
                    title: 'View Reports',
                    active: location.pathname.includes(routes.workspace().viewReports()),
                    onClick: ()=>navigate(routes.workspace().viewReports())
                },{
                    icon: RiTodoLine,
                    title: 'Todos',
                    active: location.pathname.includes(routes.workspace().todoList()),
                    onClick: ()=>navigate(routes.workspace().todoList())
                },{
                    icon: GrMoney,
                    title: 'Review Tax',
                    active: location.pathname.includes(routes.workspace().viewTaxReports()),
                    onClick: ()=>navigate(routes.workspace().viewTaxReports())
                },{
                    icon: MdDashboard,
                    title: 'Dashboad',
                    active: location.pathname.includes(routes.workspace().dashboard()),
                    onClick: ()=>navigate(routes.workspace().dashboard())
                }
            ]
        }
    ];

    return(
        <div className="auth-sidebar bg-dark">
            <div className="d-flex align-items-center py-2 bg-white">
                <div className="sidebar-logo">
                    <img className="" src={logo} alt="" />
                </div>
                <div>
                    <AiOutlineMenu className="fs-4 pointer"/>
                </div>
            </div>
            {menus.map((menu, key)=>(
                <MenuOption menu={menu} key={key}/>
            ))}
            {
                previousHistory.length &&
                <div className="text-secondary p-3">
                    <div className="fw-bold">History</div>
                    {previousHistory.map((histy, key)=>(
                        <div onClick={()=>histy?.action?.()} className="d-flex align-items-center px-3 my-2 w-100 pointer link-secondary" key={key}>
                            <div className="w-100 text-truncate">{histy?.title}</div>
                            <div className="small text-nowrap"><small><small>{histy?.time}</small></small></div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}