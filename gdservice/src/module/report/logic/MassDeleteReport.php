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

    public function __construct(){
        $this->listAllowance = new ListReportAllowances();
        $this->listDeduction = new ListReportDeductions();
        $this->listLoanAllowance = new ListLoanAllowanceByUserReport();
        $this->listLoanDeduction = new ListLoanDeductionByUserReport();
        $this->listSickLeave = new ListSickLeave();
        $this->listNoPayLeaveAllowance = new ListNoPayLeaveAllowance();
        $this->listNoPayLeaveDeduction = new ListNoPayLeaveDeduction();
    }

    public function massDeleteIfNotIncluded(
        Id $id,
        Collector $rAllowance,
        Collector $rDeduction,
        Collector $reportLoanAllowance,
        Collector $reportLoanDeduction,
        Collector $reportSickLeaves,
        Collector $reportNoPayLeaveAllowances,
        Collector $reportNoPayLeaveDeductions
    ):void{
        $allowanceCollector = $this->listAllowance->allowancesByReport($id);
        $deductionCollector = $this->listDeduction->deductionsByReport($id);
        $loanAllowanceCollector = $this->listLoanAllowance->allowancesByReport($id);
        $loanDeductionCollector = $this->listLoanDeduction->deductionsByReport($id);
        $sickCollector = $this->listSickLeave->sickLeaves($id);
        $noPayLeaveAllowanceCollector = $this->listNoPayLeaveAllowance->payLeaves($id);
        $noPayLeaveDeductionCollector = $this->listNoPayLeaveDeduction->noPayLeaves($id);

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
    }

    public function toIdArray(Collector $collector):array{
        $idArray = [];
        foreach($collector->list() as $item){
            $idArray[] = $item->id()->toString();
        }
        return $idArray;
    }
}