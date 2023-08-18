<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;

class CalculateReportLoanDeduction{
    protected float $totalDeduction = 0;
    protected Collector $collector;

    public function __construct(){
    }

    public function calculate(Collector $deductionCollector):self{
        $this->collector = $deductionCollector;

        foreach($deductionCollector->list() as $loanDeduction){
            $this->totalDeduction = $this->totalDeduction + (float)$loanDeduction->amount();
        }
        return $this;
    }

    public function totalLoanDeduction():float{
        return $this->totalDeduction;
    }

    public function reporLoanDeductions():Collector{
        return $this->collector;
    }
}