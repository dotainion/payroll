<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;

class CalculateReportNoPayLeaveDeduction{
    protected float $totalNoPayLeave = 0;
    protected Collector $collector;

    public function __construct(){
    }

    public function calculate(Collector $noPayLeaveDeductionCollector):self{
        $this->collector = $noPayLeaveDeductionCollector;

        foreach($noPayLeaveDeductionCollector->list() as $noPayLeave){
            $this->totalNoPayLeave = $this->totalNoPayLeave + (float)$noPayLeave->amount();
        }
        return $this;
    }

    public function totalNoPayLeaveDeduction():float{
        return $this->totalNoPayLeave;
    }

    public function noPayLeaveDeductions():Collector{
        return $this->collector;
    }
}