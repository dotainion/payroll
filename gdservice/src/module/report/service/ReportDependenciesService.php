<?php
namespace src\module\report\service;

use src\infrastructure\Collector;
use src\module\report\logic\FetchTaxDeductionReport;
use src\module\report\logic\ListLoanAllowanceByUserReport;
use src\module\report\logic\ListLoanDeductionByUserReport;
use src\module\report\logic\ListNoPayLeaveAllowance;
use src\module\report\logic\ListNoPayLeaveDeduction;
use src\module\report\logic\ListReportAllowances;
use src\module\report\logic\ListReportDeductions;
use src\module\report\logic\ListReportOvertime;
use src\module\report\logic\ListSickLeave;
use src\module\report\logic\YTDCalculator;
use src\module\user\logic\FetchUser;

class ReportDependenciesService{
    protected ListReportAllowances $allowance;
    protected ListReportDeductions $deduction;
    protected ListLoanAllowanceByUserReport $loanAllowance;
    protected ListLoanDeductionByUserReport $loanDeduction;
    protected ListSickLeave $sickLeave;
    protected ListNoPayLeaveAllowance $payLeave;
    protected ListNoPayLeaveDeduction $noPayLeave;
    protected ListReportOvertime $overtime;
    protected FetchTaxDeductionReport $tax;
    protected YTDCalculator $ytd;
    protected FetchUser $user;

    public function __construct(){
        $this->allowance = new ListReportAllowances();
        $this->deduction = new ListReportDeductions();
        $this->loanAllowance = new ListLoanAllowanceByUserReport();
        $this->loanDeduction = new ListLoanDeductionByUserReport();
        $this->sickLeave = new ListSickLeave();
        $this->payLeave = new ListNoPayLeaveAllowance();
        $this->noPayLeave = new ListNoPayLeaveDeduction();
        $this->overtime = new ListReportOvertime();
        $this->tax = new FetchTaxDeductionReport();
        $this->ytd = new YTDCalculator();
        $this->user = new FetchUser();
    }
    
    public function process(Collector $collector){
        foreach($collector->list() as $report){
            $report->setYtd($this->ytd->calculatedYTD($report->userId(), $report->date()));

            $allowanceCollector = $this->allowance->allowancesByReport($report->id());
            $this->ytd->calculateAllowanceYTD($allowanceCollector, $report->userId());
            $report->setToAllAllowancesCollection($allowanceCollector);

            $deductionCollector = $this->deduction->deductionsByReport($report->id());
            $this->ytd->calculateDeductionYTD($deductionCollector, $report->userId());
            $report->setToAllDeductionsCollection($deductionCollector);

            $loanAllowanceCollector = $this->loanAllowance->allowancesByReport($report->id());
            $this->ytd->calculateLoanAllowanceYTD($loanAllowanceCollector, $report->userId());
            $report->setToAllAllowancesCollection($loanAllowanceCollector);

            $loanDeductionCollector = $this->loanDeduction->deductionsByReport($report->id());
            $this->ytd->calculateLoanDeductionYTD($loanDeductionCollector, $report->userId());
            $report->setToAllDeductionsCollection($loanDeductionCollector);

            $sickLeaveCollector = $this->sickLeave->sickLeaves($report->id());
            $this->ytd->calculateSickLeaveYTD($sickLeaveCollector, $report->userId());
            $report->setToAllAllowancesCollection($sickLeaveCollector);

            $payLeaveCollector = $this->payLeave->payLeaves($report->id());
            $this->ytd->calculatePayLeaveYTD($payLeaveCollector, $report->userId());
            $report->setToAllAllowancesCollection($payLeaveCollector);

            $noPayLeaveCollector = $this->noPayLeave->noPayLeaves($report->id());
            $this->ytd->calculateNoPayLeaveYTD($noPayLeaveCollector, $report->userId());
            $report->setToAllDeductionsCollection($noPayLeaveCollector);

            $overtimeCollector = $this->overtime->overtimeByReport($report->id());
            $this->ytd->calculateOvertimeYTD($overtimeCollector, $report->userId());
            $report->setToAllAllowancesCollection($overtimeCollector);

            $taxDeductionCollector = $this->tax->taxDeductionByReportId($report->id());
            $this->ytd->calculateTaxDeductionYTD($taxDeductionCollector, $report->userId());
            $report->setToAllDeductionsCollection($taxDeductionCollector);

            $user = $this->user->user($report->userId());
            $report->setUser($user->first());
        }
        return $this;
    }
}