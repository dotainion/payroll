<?php
namespace src\router;

use src\database\Repository;
use src\database\Table;
use src\infrastructure\Env;
use src\infrastructure\Https;
use src\module\allowance\action\CreateAllowanceAction;
use src\module\allowance\action\DeleteAllowanceAction;
use src\module\allowance\action\EditAllowanceAction;
use src\module\allowance\action\ListAllowanceAction;
use src\module\allowanceDeductionIdLink\action\DeleteAllowanceDeductionIdLinkAction;
use src\module\allowanceDeductionIdLink\action\ListAllowanceDeductionIdLinkAction;
use src\module\allowanceDeductionIdLink\action\SetAllowanceDeductionIdLinkAction;
use src\module\bank\action\CreateBankAction;
use src\module\bank\action\CreateBankLinkAction;
use src\module\bank\action\DeleteBankAction;
use src\module\bank\action\DeleteBankLinkAction;
use src\module\bank\action\EditBankAction;
use src\module\bank\action\EditBankLinkAction;
use src\module\bank\action\ListBankByUserAction;
use src\module\bank\action\ListBanksAction;
use src\module\business\action\BusinessRegistrationAction;
use src\module\business\action\EditBusinessRegistrationAction;
use src\module\business\action\FetchBusinessAction;
use src\module\deduction\action\CreateDeductionAction;
use src\module\deduction\action\DeleteDeductionAction;
use src\module\deduction\action\EditDeductionAction;
use src\module\deduction\action\ListDeductionAction;
use src\module\departments\action\CreateDepartmentAction;
use src\module\departments\action\DeleteDepartmentAction;
use src\module\departments\action\EditDepartmentAction;
use src\module\departments\action\ListDepartmentsAction;
use src\module\documents\action\FetchAllowanceDeductionAction;
use src\module\documents\action\FetchCostTypesAction;
use src\module\documents\action\FetchRateTypesAction;
use src\module\login\action\AssignCredentialAction;
use src\module\login\action\FetchHasCredentialAction;
use src\module\login\action\FetchHasCredentialByTokenAction;
use src\module\login\action\FetchSessionAction;
use src\module\login\action\ListUserHasCredentialAction;
use src\module\login\action\LoginAction;
use src\module\login\action\LogoutAction;
use src\module\login\action\RemoveCredentialAction;
use src\module\login\action\SendRecoveryEmailAction;
use src\module\login\action\UpdateCredentialAction;
use src\module\login\action\UpdateCredentialByTokenAction;
use src\module\mail\action\SendBulkPayslipMailAction;
use src\module\mail\action\SendPayslipMailAction;
use src\module\notification\action\FetchNotificationSetupAction;
use src\module\notification\action\FetchUserNotificationSettingAction;
use src\module\notification\action\SetNotificationSetupAction;
use src\module\notification\action\SetUserNotificationSettingAction;
use src\module\report\action\ApproveReportAction;
use src\module\report\action\CalculateReportAction;
use src\module\report\action\CloneBulkReportAction;
use src\module\report\action\CreateBulkReportAction;
use src\module\report\action\CreateReportAction;
use src\module\report\action\DeleteAllowanceReportAction;
use src\module\report\action\DeleteDeductionReportAction;
use src\module\report\action\EditReportAction;
use src\module\report\action\FetchReportAction;
use src\module\report\action\GenerateBulkReportByUserIdsAction;
use src\module\report\action\ListBulkReportAction;
use src\module\report\action\ListBulkReportBySpecifyReportIdsAction;
use src\module\report\action\ListLoanAllowanceReportByUserAction;
use src\module\report\action\ListLoanDeductionReportByUserAction;
use src\module\report\action\ListPendingReportsAction;
use src\module\report\action\ListReportPeriodsAction;
use src\module\report\action\ListUserReportAction;
use src\module\report\action\SearchBulkReportByDateAction;
use src\module\report\action\SearchReportByDateAndUserIdAction;
use src\module\settings\action\DeleteOvertimeSettingsAction;
use src\module\settings\action\FetchOvertimeSettingsAction;
use src\module\settings\action\FetchProrateSettingsAction;
use src\module\settings\action\FetchSickLeaveSettingsAction;
use src\module\settings\action\ListOvertimeSettingsAction;
use src\module\settings\action\SetOvertimeSettingsAction;
use src\module\settings\action\SetProrateSettingsAction;
use src\module\settings\action\SetSickLeaveSettingsAction;
use src\module\tax\action\DeleteTaxSettingsAction;
use src\module\tax\action\ListTaxSettingsAction;
use src\module\tax\action\SetTaxSettingsAction;
use src\module\todo\action\AssignToAction;
use src\module\todo\action\CompleteTodoAction;
use src\module\todo\action\DeleteTodoAction;
use src\module\todo\action\ListOverDueTodoByUserAction;
use src\module\todo\action\ListTodoByUserAction;
use src\module\todo\action\SetTodoAction;
use src\module\user\action\AddToPayrollAction;
use src\module\user\action\CreateUserAction;
use src\module\user\action\EditUserAction;
use src\module\user\action\FetchUserAction;
use src\module\user\action\ListUsersAction;
use src\module\user\action\RemoveFromPayrollAction;
use src\schema\Schema;
use src\schema\Truncate;

class Router{
    protected Https $request;

    public function __construct($baseName){
        $this->request = new Https($baseName);
    }

    public function request(){
        return $this->request;
    }

    public function load(){
        $this->request->route('/schema', function ($req){
            $query = new Schema();
            $query->run();
        });

        /*$this->request->route('/truncate', function ($req){
            $query = new Truncate();
            $query->run();
        });*/

        $this->request->route('/test', function ($req){
            var_dump(Env::dir());
        });

        $this->request->route('/signin', function ($req){
            return new LoginAction();
        });

        $this->request->route('/logout', function ($req){
            return new LogoutAction();
        });

        $this->request->route('/fetch/token', function ($req){
            return new FetchSessionAction();
        });

        $this->request->route('/update/credential', function ($req){
            return new UpdateCredentialAction();
        });

        $this->request->route('/recover/account', function ($req){
            return new SendRecoveryEmailAction();
        });

        $this->request->route('/list/users', function ($req){
            return new ListUsersAction();
        });
        
        $this->request->route('/list/users/with/has/credential', function ($req){
            return new ListUserHasCredentialAction();
        });

        $this->request->route('/create/user', function ($req){
            return new CreateUserAction();
        });

        $this->request->route('/edit/user', function ($req){
            return new EditUserAction();
        });

        $this->request->route('/fetch/user', function ($req){
            return new FetchUserAction();
        });

        $this->request->route('/list/allowances', function ($req){
            return new ListAllowanceAction();
        });

        $this->request->route('/list/deductions', function ($req){
            return new ListDeductionAction();
        });

        $this->request->route('/create/allowance', function ($req){
            return new CreateAllowanceAction();
        });

        $this->request->route('/edit/allowance', function ($req){
            return new EditAllowanceAction();
        });

        $this->request->route('/delete/allowance', function ($req){
            return new DeleteAllowanceAction();
        });

        $this->request->route('/create/deduction', function ($req){
            return new CreateDeductionAction();
        });

        $this->request->route('/edit/deduction', function ($req){
            return new EditDeductionAction();
        });

        $this->request->route('/delete/deduction', function ($req){
            return new DeleteDeductionAction();
        });

        $this->request->route('/fetch/cost/types', function ($req){
            return new FetchCostTypesAction();
        });

        $this->request->route('/fetch/rate/types', function ($req){
            return new FetchRateTypesAction();
        });

        $this->request->route('/create/department', function ($req){
            return new CreateDepartmentAction();
        });

        $this->request->route('/edit/department', function ($req){
            return new EditDepartmentAction();
        });

        $this->request->route('/delete/department', function ($req){
            return new DeleteDepartmentAction();
        });

        $this->request->route('/list/departments', function ($req){
            return new ListDepartmentsAction();
        });

        $this->request->route('/create/report', function ($req){
            return new CreateReportAction();
        });

        $this->request->route('/edit/report', function ($req){
            return new EditReportAction();
        });

        $this->request->route('/list/user/report', function ($req){
            return new ListUserReportAction();
        });

        $this->request->route('/create/bank', function ($req){
            return new CreateBankAction();
        });

        $this->request->route('/edit/bank', function ($req){
            return new EditBankAction();
        });

        $this->request->route('/delete/bank', function ($req){
            return new DeleteBankAction();
        });

        $this->request->route('/create/bank/link', function ($req){
            return new CreateBankLinkAction();
        });

        $this->request->route('/edit/bank/link', function ($req){
            return new EditBankLinkAction();
        });

        $this->request->route('/delete/user/bank', function ($req){
            return new DeleteBankLinkAction();
        });

        $this->request->route('/list/user/banks', function ($req){
            return new ListBankByUserAction();
        });

        $this->request->route('/list/banks', function ($req){
            return new ListBanksAction();
        });

        $this->request->route('/list/user/loan/allowances', function ($req){
            return new ListLoanAllowanceReportByUserAction();
        });

        $this->request->route('/list/user/loan/deductions', function ($req){
            return new ListLoanDeductionReportByUserAction();
        });

        $this->request->route('/create/bulk/reports', function ($req){
            return new CreateBulkReportAction();
        });

        $this->request->route('/calculate/report', function ($req){
            return new CalculateReportAction();
        });

        $this->request->route('/list/bulk/reports', function ($req){
            return new ListBulkReportAction();
        });

        $this->request->route('/search/bulk/reports/by/date', function ($req){
            return new SearchBulkReportByDateAction();
        });

        $this->request->route('/list/reports/by/specified/reportId', function ($req){
            return new ListBulkReportBySpecifyReportIdsAction();
        });

        $this->request->route('/fetch/report', function ($req){
            return new FetchReportAction();
        });

        $this->request->route('/delete/allowance/report', function ($req){
            return new DeleteAllowanceReportAction();
        });

        $this->request->route('/delete/deduction/report', function ($req){
            return new DeleteDeductionReportAction();
        });

        $this->request->route('/register/business', function ($req){
            return new BusinessRegistrationAction();
        });

        $this->request->route('/edit/business', function ($req){
            return new EditBusinessRegistrationAction();
        });

        $this->request->route('/fetch/business', function ($req){
            return new FetchBusinessAction();
        });

        $this->request->route('/fetch/has/credential', function ($req){
            return new FetchHasCredentialAction();
        });

        $this->request->route('/fetch/has/credential/by/refreshtoken', function ($req){
            return new FetchHasCredentialByTokenAction();
        });

        $this->request->route('/assing/user/credential', function ($req){
            return new AssignCredentialAction();
        });

        $this->request->route('/remove/user/credential', function ($req){
            return new RemoveCredentialAction();
        });

        $this->request->route('/update/credential/with/refersh/token', function ($req){
            return new UpdateCredentialByTokenAction();
        });

        $this->request->route('/send/payslip/mail', function ($req){
            return new SendPayslipMailAction();
        });

        $this->request->route('/send/bulk/payslip/mail', function ($req){
            return new SendBulkPayslipMailAction();
        });

        $this->request->route('/fetch/sickleave/settings', function ($req){
            return new FetchSickLeaveSettingsAction();
        });

        $this->request->route('/set/sickleave/settings', function ($req){
            return new SetSickLeaveSettingsAction();
        });

        $this->request->route('/set/prorate/settings', function ($req){
            return new SetProrateSettingsAction();
        });

        $this->request->route('/fetch/prorate/settings', function ($req){
            return new FetchProrateSettingsAction();
        });

        $this->request->route('/list/periods', function ($req){
            return new ListReportPeriodsAction();
        });

        $this->request->route('/fetch/notification/setup', function ($req){
            return new FetchNotificationSetupAction();
        });

        $this->request->route('/fetch/user/notification/setting', function ($req){
            return new FetchUserNotificationSettingAction();
        });

        $this->request->route('/set/notification/setup', function ($req){
            return new SetNotificationSetupAction();
        });

        $this->request->route('/set/user/notification/setting', function ($req){
            return new SetUserNotificationSettingAction();
        });

        $this->request->route('/list/tax/setting', function ($req){
            return new ListTaxSettingsAction();
        });

        $this->request->route('/delete/tax/setting', function ($req){
            return new DeleteTaxSettingsAction();
        });

        $this->request->route('/set/tax/setting', function ($req){
            return new SetTaxSettingsAction();
        });

        $this->request->route('/list/allowance/deduction/doc/id/link', function ($req){
            return new FetchAllowanceDeductionAction();
        });
        
        $this->request->route('/set/allowance/deduction/id/link', function ($req){
            return new SetAllowanceDeductionIdLinkAction();
        });

        $this->request->route('/list/allowance/deduction/id/link', function ($req){
            return new ListAllowanceDeductionIdLinkAction();
        });

        $this->request->route('/delete/allowance/deduction/id/link', function ($req){
            return new DeleteAllowanceDeductionIdLinkAction();
        });

        $this->request->route('/set/overtime/settings', function ($req){
            return new SetOvertimeSettingsAction();
        });

        $this->request->route('/fetch/overtime/settings', function ($req){
            return new FetchOvertimeSettingsAction();
        });

        $this->request->route('/delete/overtime/settings', function ($req){
            return new DeleteOvertimeSettingsAction();
        });

        $this->request->route('/list/overtime/settings', function ($req){
            return new ListOvertimeSettingsAction();
        });

        $this->request->route('/clone/bulk/reports', function ($req){
            return new CloneBulkReportAction();
        });

        $this->request->route('/list/user/reports/by/date', function ($req){
            return new SearchReportByDateAndUserIdAction();
        });

        $this->request->route('/complete/todo', function ($req){
            return new CompleteTodoAction();
        });

        $this->request->route('/delete/todo', function ($req){
            return new DeleteTodoAction();
        });

        $this->request->route('/set/todo', function ($req){
            return new SetTodoAction();
        });

        $this->request->route('/assign/todo/to/user', function ($req){
            return new AssignToAction();
        });

        $this->request->route('/list/todo/by/user', function ($req){
            return new ListTodoByUserAction();
        });

        $this->request->route('/list/overdue/todo', function ($req){
            return new ListOverDueTodoByUserAction();
        });

        $this->request->route('/add/to/user/collection', function ($req){
            return new AddToPayrollAction();
        });

        $this->request->route('/remove/from/user/collection', function ($req){
            return new RemoveFromPayrollAction();
        });

        $this->request->route('/approve/report', function ($req){
            return new ApproveReportAction();
        });

        $this->request->route('/generate/bulk/report/by/user/id', function ($req){
            return new GenerateBulkReportByUserIdsAction();
        });

        $this->request->route('/list/pending/reports', function ($req){
            return new ListPendingReportsAction();
        });
    }

    public function execute(){
        $this->request->__INIT__();
    }
}

?>
