<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;

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
        TaxReportToFactory $taxDeduction
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

        $allowanceArray = $this->toIdArray($rAllowance);
        foreach($allowanceCollector->list() as $item){
            if(!in_array($item->id()->toString(), $allowanceArray)){
                (new DeleteReportAllowance())->delete($item->id());
            }
        }
        $deductionArray = $this->toIdArray($rDeduction);
        foreach($deductionCollector->list() as $item){
            if(!in_array($item->id()->toString(), $deductionArray)){
                (new DeleteReportDeduction())->delete($item->id());
            }
        }
        $loanAllowanceArray = $this->toIdArray($reportLoanAllowance);
        foreach($loanAllowanceCollector->list() as $item){
            if(!in_array($item->id()->toString(), $loanAllowanceArray)){
                (new DeleteReportLoanAllowance())->delete($item->id());
            }
        }
        $loanDllowanceArray = $this->toIdArray($reportLoanDeduction);
        foreach($loanDeductionCollector->list() as $item){
            if(!in_array($item->id()->toString(), $loanDllowanceArray)){
                (new DeleteReportLoanDeduction())->delete($item->id());
            }
        }
        $sickArray = $this->toIdArray($reportSickLeaves);
        foreach($sickCollector->list() as $item){
            if(!in_array($item->id()->toString(), $sickArray)){
                (new DeleteSickLeaveReport())->delete($item->id());
            }
        }
        $noPayLeaveAllowanceArray = $this->toIdArray($reportNoPayLeaveAllowances);
        foreach($noPayLeaveAllowanceCollector->list() as $item){
            if(!in_array($item->id()->toString(), $noPayLeaveAllowanceArray)){
                (new DeleteNoPayLeaveAllowanceReport())->delete($item->id());
            }
        }
        $noPayLeaveDeductionArray = $this->toIdArray($reportNoPayLeaveDeductions);
        foreach($noPayLeaveDeductionCollector->list() as $item){
            if(!in_array($item->id()->toString(), $noPayLeaveDeductionArray)){
                (new DeleteNoPayLeaveDeductionReport())->delete($item->id());
            }
        }
        $overtimeArray = $this->toIdArray($reportOvertime);
        foreach($overtimeCollector->list() as $item){
            if(!in_array($item->id()->toString(), $overtimeArray)){
                (new DeleteReportOvertime())->delete($item->id());
            }
        }
        if(!$taxDeduction->hasTaxDeduction()){
            foreach($taxDeductionCollector->list() as $item){
                (new DeleteReportTaxDeduction())->delete($item->id());
            }
        }
        
    }

    public function toIdArray(Collector $collector):array{
        $idArray = [];
        foreach($collector->list() as $item){
            $idArray[] = $item->id()->toString();
        }
        return $idArray;
    }
}