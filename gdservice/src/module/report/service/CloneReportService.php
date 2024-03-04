<?php
namespace src\module\report\service;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\FetchReportAllowanceDeductionIdLink;
use src\module\report\logic\FetchTaxDeductionReport;
use src\module\report\logic\HandleAllowanceDeductionIdLinkToFactory;
use src\module\report\logic\ListLoanAllowanceByUserReport;
use src\module\report\logic\ListLoanDeductionByUserReport;
use src\module\report\logic\ListNoPayLeaveAllowance;
use src\module\report\logic\ListNoPayLeaveDeduction;
use src\module\report\logic\ListReportAllowances;
use src\module\report\logic\ListReportDeductions;
use src\module\report\logic\ListReportOvertime;
use src\module\report\logic\ListSickLeave;
use src\module\report\logic\SetReportAllowance;
use src\module\report\logic\SetReportAllowanceDeductionIdLink;
use src\module\report\logic\SetReportDeduction;
use src\module\report\logic\SetReportLoanAllowance;
use src\module\report\logic\SetReportLoanDeduction;
use src\module\report\logic\SetReportNoPayLeaveAllowance;
use src\module\report\logic\SetReportNoPayLeaveDeduction;
use src\module\report\logic\SetReportOvertime;
use src\module\report\logic\SetReportSickLeave;
use src\module\report\logic\SetReportTaxDeduction;
use src\module\report\logic\YTDCalculator;
use src\module\user\logic\FetchUser;

class CloneReportService extends Service{
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
        
    protected SetReportAllowance $setAllowance;
    protected SetReportDeduction $setDeduction;
    protected SetReportLoanAllowance $setLoanAllowance;
    protected SetReportLoanDeduction $setLoanDeduction;
    protected SetReportSickLeave $setSickLeave;
    protected SetReportNoPayLeaveAllowance $setNoPayLeaveAllowance;
    protected SetReportNoPayLeaveDeduction $setNoPayLeaveDeduction;
    protected SetReportOvertime $setOvertime;
    protected SetReportAllowanceDeductionIdLink $setOptionLink;
    protected SetReportTaxDeduction $setTaxDeduction;

    public function __construct(){
        parent::__construct();
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
        
        $this->setAllowance = new SetReportAllowance();
        $this->setDeduction = new SetReportDeduction();
        $this->setLoanAllowance = new SetReportLoanAllowance();
        $this->setLoanDeduction = new SetReportLoanDeduction();
        $this->setSickLeave = new SetReportSickLeave();
        $this->setNoPayLeaveAllowance = new SetReportNoPayLeaveAllowance();
        $this->setNoPayLeaveDeduction = new SetReportNoPayLeaveDeduction();
        $this->setOvertime = new SetReportOvertime();
        $this->setOptionLink = new SetReportAllowanceDeductionIdLink();
        $this->setTaxDeduction = new SetReportTaxDeduction();
    }
    
    public function process(Collector $collector){
        foreach($collector->list() as $report){
            $reportId = (new Id())->new()->toString();

            $newOptionLinkIdArray = [];
            $existingOptionLinkIdArray = [];
            $allowanceCollector = $this->allowance->allowancesByReport($report->id());
            foreach($allowanceCollector->list() as $allowance){
                $newId = (new Id())->new()->toString();
                $newOptionLinkIdArray[] = $newId;
                $existingOptionLinkIdArray[] = $allowance->id();
                $allowance->setId($newId);
                $allowance->setReportId($reportId);
            }
            $this->ytd->calculateAllowanceYTD($allowanceCollector, $report->userId());
            $report->setToAllAllowancesCollection($allowanceCollector);
            $this->setAllowance->massEdit($allowanceCollector, true);

            $deductionCollector = $this->deduction->deductionsByReport($report->id());
            foreach($deductionCollector->list() as $deduction){
                $newId = (new Id())->new()->toString();
                $newOptionLinkIdArray[] = $newId;
                $existingOptionLinkIdArray[] = $allowance->id();
                $deduction->setId($newId);
                $deduction->setReportId($reportId);
            }
            $this->ytd->calculateDeductionYTD($deductionCollector, $report->userId());
            $report->setToAllDeductionsCollection($deductionCollector);
            $this->setDeduction->massEdit($deductionCollector, true);

            $loanAllowanceCollector = $this->loanAllowance->allowancesByReport($report->id());
            foreach($loanAllowanceCollector->list() as $loanAllowance){
                $loanAllowance->setId((new Id())->new()->toString());
                $loanAllowance->setReportId($reportId);
            }
            $this->ytd->calculateLoanAllowanceYTD($loanAllowanceCollector, $report->userId());
            $report->setToAllAllowancesCollection($loanAllowanceCollector);
            $this->setLoanAllowance->massEdit($loanAllowanceCollector, true);

            $loanDeductionCollector = $this->loanDeduction->deductionsByReport($report->id());
            foreach($loanDeductionCollector->list() as $loanDeduction){
                $loanDeduction->setId((new Id())->new()->toString());
                $loanDeduction->setReportId($reportId);
            }
            $this->ytd->calculateLoanDeductionYTD($loanDeductionCollector, $report->userId());
            $report->setToAllDeductionsCollection($loanDeductionCollector);
            $this->setLoanDeduction->massEdit($loanDeductionCollector, true);

            $sickLeaveCollector = $this->sickLeave->sickLeaves($report->id());
            foreach($sickLeaveCollector->list() as $sickLeave){
                $sickLeave->setId((new Id())->new()->toString());
                $sickLeave->setReportId($reportId);
            }
            $this->ytd->calculateSickLeaveYTD($sickLeaveCollector, $report->userId());
            $report->setToAllAllowancesCollection($sickLeaveCollector);
            $this->setSickLeave->massEdit($sickLeaveCollector, true);

            $payLeaveCollector = $this->payLeave->payLeaves($report->id());
            foreach($payLeaveCollector->list() as $payLeave){
                $payLeave->setId((new Id())->new()->toString());
                $payLeave->setReportId($reportId);
            }
            $this->ytd->calculatePayLeaveYTD($payLeaveCollector, $report->userId());
            $report->setToAllAllowancesCollection($payLeaveCollector);
            $this->setNoPayLeaveAllowance->massEdit($payLeaveCollector, true);

            $noPayLeaveCollector = $this->noPayLeave->noPayLeaves($report->id());
            foreach($noPayLeaveCollector->list() as $noPayLeave){
                $noPayLeave->setId((new Id())->new()->toString());
                $noPayLeave->setReportId($reportId);
            }
            $this->ytd->calculateNoPayLeaveYTD($noPayLeaveCollector, $report->userId());
            $report->setToAllDeductionsCollection($noPayLeaveCollector);
            $this->setNoPayLeaveDeduction->massEdit($noPayLeaveCollector, true);

            $overtimeCollector = $this->overtime->overtimeByReport($report->id());
            foreach($overtimeCollector->list() as $overtime){
                $overtime->setId((new Id())->new()->toString());
                $overtime->setReportId($reportId);
            }
            $this->ytd->calculateOvertimeYTD($overtimeCollector, $report->userId());
            $report->setToAllAllowancesCollection($overtimeCollector);
            $this->setOvertime->massEdit($overtimeCollector, true);

            $taxDeductionCollector = $this->tax->taxDeductionByReportId($report->id());
            foreach($taxDeductionCollector->list() as $taxDeduction){
                $taxDeduction->setId((new Id())->new()->toString());
                $taxDeduction->setReportId($reportId);
            }
            $this->ytd->calculateTaxDeductionYTD($taxDeductionCollector, $report->userId());
            $report->setToAllDeductionsCollection($taxDeductionCollector);
            $this->setTaxDeduction->edit($taxDeductionCollector);

            $allowanceOptionLinkCollector = (new FetchReportAllowanceDeductionIdLink())->reportOptionByReportLinkIdArray($existingOptionLinkIdArray);
            $allowDeducOptionLinkCollector = (new HandleAllowanceDeductionIdLinkToFactory())->cloneToFactory($allowanceOptionLinkCollector, $existingOptionLinkIdArray, $newOptionLinkIdArray);
            $this->setOptionLink->setOptionLink($allowDeducOptionLinkCollector->optionLinks());

            $user = $this->user->user($report->userId());
            $report->setUser($user->first());
            $report->setId($reportId);
        }

        $this->setOutput($collector);
        return $this;
    }
}
