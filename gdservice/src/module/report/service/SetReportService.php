<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\allowance\factory\AllowanceFactory;
use src\module\allowance\logic\BuildAllowance;
use src\module\deduction\factory\DeductionFactory;
use src\module\deduction\logic\BuildDeduction;
use src\module\report\logic\CalculateReportAllowance;
use src\module\report\logic\CalculateReportDeduction;
use src\module\report\logic\CalculateReportLoanAllowance;
use src\module\report\logic\CalculateReportLoanDeduction;
use src\module\report\logic\CalculateReportNoPayLeaveAllowance;
use src\module\report\logic\CalculateReportNoPayLeaveDeduction;
use src\module\report\logic\CalculateReportOvertime;
use src\module\report\logic\CalculateReportSickLeave;
use src\module\report\logic\LoanAllowanceReportToFactory;
use src\module\report\logic\LoanDeductionReportToFactory;
use src\module\report\logic\NoPayLeaveAllowanceReportToFactory;
use src\module\report\logic\NoPayLeaveDeductionReportToFactory;
use src\module\report\logic\OvertimeReportToFactory;
use src\module\report\logic\SetReport;
use src\module\report\logic\SickLeaveReportToFactory;
use src\module\user\logic\FetchUser;

class SetReportService extends Service{
    protected AllowanceFactory $allowanceFactory;
    protected DeductionFactory $deductionFactory;
    protected SetReport $report;
    protected FetchUser $user;

    public function __construct(){
        parent::__construct();
        $this->allowanceFactory = new AllowanceFactory();
        $this->deductionFactory = new DeductionFactory();
        $this->report = new SetReport();
        $this->user = new FetchUser();
    }

    public function stopExecution($stopExecution):void{
        $this->report->stopExecution($stopExecution);
    }
    
    public function process(
        $id,
        $reportId,
        $allowance,
        $deduction,
        $loanAllowances,
        $loanDeductions,
        $sickLeaves,
        $overtime,
        $noPayLeaveAllowances,
        $noPayLeaveDeductions,
        $period
    ){
        Assert::validUuid($reportId, 'Report not found.');
        Assert::validDate($period['from'], 'Invlid periord date.');
        Assert::validDate($period['to'], 'Invlid periord date.');

        $reportId = (new Id())->set($reportId);

        $periodFrom = new DateHelper();
        $periodTo = new DateHelper();
        $periodFrom->set($period['from']);
        $periodTo->set($period['to']);

        $userCollector = $this->user->user((new Id())->set($id));
        $userCollector->assertHasItem('User not found.');
        $user = $userCollector->first();

        $sickLeaveCollector = (new SickLeaveReportToFactory())->toFactory($sickLeaves, $user->id(), $reportId);
        $reportSickLeaves = (new CalculateReportSickLeave())->calculate($sickLeaveCollector);

        $noPayLeaveAllowanceCollector = (new NoPayLeaveAllowanceReportToFactory())->toFactory($noPayLeaveAllowances, $user->id(), $reportId);
        $reportNoPayLeaveAllowances = (new CalculateReportNoPayLeaveAllowance())->calculate($noPayLeaveAllowanceCollector);

        $noPayLeaveDeductionCollector = (new NoPayLeaveDeductionReportToFactory())->toFactory($noPayLeaveDeductions, $user->id(), $reportId);
        $reportNoPayLeaveDeductions = (new CalculateReportNoPayLeaveDeduction())->calculate($noPayLeaveDeductionCollector);

        $loanAllowanceCollector = (new LoanAllowanceReportToFactory())->toFactory($loanAllowances, $user->id(), $reportId);
        $reportLoanAllowance = (new CalculateReportLoanAllowance())->calculate($loanAllowanceCollector);

        $loanDeductionCollector = (new LoanDeductionReportToFactory())->toFactory($loanDeductions, $user->id(), $reportId);
        $reportLoanDeduction = (new CalculateReportLoanDeduction())->calculate($loanDeductionCollector);

        $allowanceCollector = (new BuildAllowance())->toFactory($allowance);
        $reportAllowance = (new CalculateReportAllowance())->calculateWidthClone($allowanceCollector, (float)$user->salary(), $reportId);

        $deductionCollector = (new BuildDeduction())->toFactory($deduction);
        $reportDeduction = (new CalculateReportDeduction())->calculateWidthClone($deductionCollector, (float)$user->salary(), $reportId);

        $overtimeCollector = (new OvertimeReportToFactory())->toFactory($overtime, $user->id(), $reportId);
        $reportOvertime = (new CalculateReportOvertime())->calculate($overtimeCollector);

        $report = $this->report->create(
            $user, 
            $periodFrom,
            $periodTo,
            $reportAllowance, 
            $reportDeduction, 
            $reportLoanAllowance,
            $reportLoanDeduction,
            $reportSickLeaves,
            $reportNoPayLeaveAllowances,
            $reportNoPayLeaveDeductions,
            $reportOvertime,
            $reportId
        );

        $this->setOutput($report);
        return $this;
    }
}