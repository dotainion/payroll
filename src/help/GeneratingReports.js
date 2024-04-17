import React from "react";
import user1 from "../images/creating-user-report-1.png";
import user2 from "../images/creating-user-report-2.png";
import user3 from "../images/creating-user-report-3.png";
import bulk1 from "../images/creating-bulk-report-1.png";
import bulk2 from "../images/creating-bulk-report-2.png";
import newBulk1 from "../images/creating-bulk-new-report-1.png";
import newBulk2 from "../images/creating-bulk-new-report-2.png";
import newBulk3 from "../images/creating-bulk-new-report-3.png";

export const GeneratingReports = () =>{
    return(
        <div className="help-generating-report container">
            <h2 className="mb-4 fw-bold">Creating user report</h2>
            <div className="fs-3">There are three ways to generate a report for a employee</div>
            <div className="bg-light border border-4 rounded-3 w-100 my-4 p-4 fs-4">
                <div className="d-flex">
                    <img src={user1} alt="" />
                    <div className="border-start border-4 mx-4"></div>
                    <div>
                        <div>To create a new employee report, click Employees from the side bar.</div>
                        <div>Then click on the required employee</div>
                        <div>From the dropdown displyed select generate report</div>
                        <div>You will be redirected to generate a custom report for the selected employee</div>
                    </div>
                </div>
            </div>
            <div className="bg-light border border-4 rounded-3 w-100 my-4 p-4 fs-4">
                <div className="d-flex">
                    <img src={user2} alt="" />
                    <div className="border-start border-4 mx-4"></div>
                    <div>
                        <div>From the edit employee screen click create report from the top menu.</div>
                    </div>
                </div>
            </div>
            <div className="bg-light border border-4 rounded-3 w-100 my-4 p-4 fs-4">
                <div className="d-flex">
                    <img src={user3} alt="" />
                    <div className="border-start border-4 mx-4"></div>
                    <div>
                        <div>From the employee bank and credential screen click create report from the top menu.</div>
                    </div>
                </div>
            </div>
            <h2 className="my-4 fw-bold">Creating bulk report from previous report generated</h2>
            <div className="bg-light border border-4 rounded-3 w-100 my-4 p-4 fs-4">
                <div className="d-flex">
                    <img src={bulk1} alt="" />
                    <div className="border-start border-4 mx-4"></div>
                    <div>
                        <div>To create a bulk report, click bulk report from the side bar.</div>
                        <div>Then click on 'Generate bulk report from the last payroll report generated'</div>
                        <div>You will be navigated to the last reports generated for each employee</div>
                    </div>
                </div>
            </div>
            <div className="bg-light border border-4 rounded-3 w-100 my-4 p-4 fs-4">
                <div className="d-flex">
                    <img src={bulk2} alt="" />
                    <div className="border-start border-4 mx-4"></div>
                    <div>
                        <div>You can uncheck any user that you done want to be included in the report</div>
                        <div className="text-muted small my-2">If one or more emplyee which is required for this report is not present, this means there was never a report generetd for that employee. Report will need to be generated individually. See 'Creating user report' from above.</div>
                        <div>Finally click clone report from the top menu to generate the bulk report</div>
                    </div>
                </div>
            </div>
            <h2 className="my-4 fw-bold">Creating bulk report</h2>
            <div className="bg-light border border-4 rounded-3 w-100 my-4 p-4 fs-4">
                <div className="d-flex">
                    <img src={newBulk1} alt="" />
                    <div className="border-start border-4 mx-4"></div>
                    <div>
                        <div>To create a bulk report, click bulk report from the side bar.</div>
                        <div>Then click on 'Generate bulk report'</div>
                        <div>You will be navigated to the screen to select employees to generate report for</div>
                    </div>
                </div>
            </div>
            <div className="bg-light border border-4 rounded-3 w-100 my-4 p-4 fs-4">
                <div className="d-flex">
                    <img src={newBulk2} alt="" />
                    <div className="border-start border-4 mx-4"></div>
                    <div>
                        <div>Click the 'Add/Remove employee' button</div>
                        <div>It will bring up a window to add or remove employee by selecting the checkbox</div>
                        <div>Then click select a period date range</div>
                        <div>After that click 'Generate report' button which will navigate you to </div>
                    </div>
                </div>
            </div>
            <div className="bg-light border border-4 rounded-3 w-100 my-4 p-4 fs-4">
                <div className="d-flex">
                    <img src={newBulk3} alt="" />
                    <div className="border-start border-4 mx-4"></div>
                    <div>
                        <div>From this screen you can edit each individually report by clicking the edit button on the side of each report</div>
                        <div>once you are done you can click 'Approve report' button so it will be posted.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}