<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;

class CalculateReportLoanAllowance{
    protected float $totalAllowance = 0;
    protected Collector $collector;

    public function __construct(){
    }

    public function calculate(Collector $allowanceCollector):self{
        $this->collector = $allowanceCollector;

        foreach($allowanceCollector->list() as $loanAllowance){
            $this->totalAllowance = $this->totalAllowance + (float)$loanAllowance->amount();
        }
        return $this;
    }

    public function totalLoanAllowance():float{
        return $this->totalAllowance;
    }

    public function reportLoanAllowances():Collector{
        return $this->collector;
    }
}