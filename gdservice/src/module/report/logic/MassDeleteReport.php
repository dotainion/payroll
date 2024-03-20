<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\prorate\logic\DeleteProrate;
use src\module\prorate\logic\ListProrate;
use src\module\prorate\objects\Prorate;

class MassDeleteReport{
    protected ListReportAllowances $listAllowance;
    protected ListReportDeductions $listDeduction;
    protected ListLoanAllowanceByUserReport $listLoanAllowance;
    protected ListLoanDeductionByUserReport $listLoanDeduction;
    protected ListSickLeave $listSickLeave;
    protected ListNoPayLeaveAllowance $listNoPayLeaveAllowance;
    protected ListNoPayLeaveDeduction $listNoPayLeaveDeduction;
    protected ListReportOvertime $listOvertime;
    protected FetchTaxDeductionReport $listTaxDedution;
    protected ListProrate $listProrate;

    public function __construct(){
        $this->listAllowance = new ListReportAllowances();
        $this->listDeduction = new ListReportDeductions();
        $this->listLoanAllowance = new ListLoanAllowanceByUserReport();
        $this->listLoanDeduction = new ListLoanDeductionByUserReport();
        $this->listSickLeave = new ListSickLeave();
        $this->listNoPayLeaveAllowance = new ListNoPayLeaveAllowance();
        $this->listNoPayLeaveDeduction = new ListNoPayLeaveDeduction();
        $this->listOvertime = new ListReportOvertime();
        $this->listTaxDedution = new FetchTaxDeductionReport();
        $this->listProrate = new ListProrate();
    }

    public function massDeleteIfNotIncluded(
        Id $reportId,
        Collector $rAllowance,
        Collector $rDeduction,
        Collector $reportLoanAllowance,
        Collector $reportLoanDeduction,
        Collector $reportSickLeaves,
        Collector $reportNoPayLeaveAllowances,
        Collector $reportNoPayLeaveDeductions,
        Collector $reportOvertime,
        Collector $taxDeduction,
        Collector $prorate
    ):void{
        $allowanceCollector = $this->listAllowance->allowancesByReport($reportId);
        $deductionCollector = $this->listDeduction->deductionsByReport($reportId);
        $loanAllowanceCollector = $this->listLoanAllowance->allowancesByReport($reportId);
        $loanDeductionCollector = $this->listLoanDeduction->deductionsByReport($reportId);
        $sickCollector = $this->listSickLeave->sickLeaves($reportId);
        $noPayLeaveAllowanceCollector = $this->listNoPayLeaveAllowance->payLeaves($reportId);
        $noPayLeaveDeductionCollector = $this->listNoPayLeaveDeduction->noPayLeaves($reportId);
        $overtimeCollector = $this->listOvertime->overtimeByReport($reportId);
        $taxDeductionCollector = $this->listTaxDedution->taxDeductionByReportId($reportId);
        $prorateCollector = $this->listProrate->byProductId($reportId);

        $allowanceArray = $rAllowance->toIdArray();
        foreach($allowanceCollector->list() as $item){
            if(!in_array($item->id()->toString(), $allowanceArray)){
                (new DeleteReportAllowance())->delete($item->id());
            }
        }
        $deductionArray = $rDeduction->toIdArray();
        foreach($deductionCollector->list() as $item){
            if(!in_array($item->id()->toString(), $deductionArray)){
                (new DeleteReportDeduction())->delete($item->id());
            }
        }
        $loanAllowanceArray = $reportLoanAllowance->toIdArray();
        foreach($loanAllowanceCollector->list() as $item){
            if(!in_array($item->id()->toString(), $loanAllowanceArray)){
                (new DeleteReportLoanAllowance())->delete($item->id());
            }
        }
        $loanDllowanceArray = $reportLoanDeduction->toIdArray();
        foreach($loanDeductionCollector->list() as $item){
            if(!in_array($item->id()->toString(), $loanDllowanceArray)){
                (new DeleteReportLoanDeduction())->delete($item->id());
            }
        }
        $sickArray = $reportSickLeaves->toIdArray();
        foreach($sickCollector->list() as $item){
            if(!in_array($item->id()->toString(), $sickArray)){
                (new DeleteSickLeaveReport())->delete($item->id());
            }
        }
        $noPayLeaveAllowanceArray = $reportNoPayLeaveAllowances->toIdArray();
        foreach($noPayLeaveAllowanceCollector->list() as $item){
            if(!in_array($item->id()->toString(), $noPayLeaveAllowanceArray)){
                (new DeleteNoPayLeaveAllowanceReport())->delete($item->id());
            }
        }
        $noPayLeaveDeductionArray = $reportNoPayLeaveDeductions->toIdArray();
        foreach($noPayLeaveDeductionCollector->list() as $item){
            if(!in_array($item->id()->toString(), $noPayLeaveDeductionArray)){
                (new DeleteNoPayLeaveDeductionReport())->delete($item->id());
            }
        }
        $overtimeArray = $reportOvertime->toIdArray();
        foreach($overtimeCollector->list() as $item){
            if(!in_array($item->id()->toString(), $overtimeArray)){
                (new DeleteReportOvertime())->delete($item->id());
            }
        }
        $taxDeductionArray = $taxDeduction->toIdArray();
        foreach($taxDeductionCollector->list() as $item){
            if(!in_array($item->id()->toString(), $taxDeductionArray)){
                (new DeleteReportTaxDeduction())->delete($item->id());
            }
        }
        $prorateArray = $prorate->toIdArray();
        foreach($prorateCollector->list() as $item){
            if(!in_array($item->id()->toString(), $prorateArray)){
                (new DeleteProrate())->delete($item->id());
            }
        }
    }
}