<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;

class CalculateReportNoPayLeaveAllowance{
    protected float $totalNoPayLeave = 0;
    protected Collector $collector;

    public function __construct(){
    }

    public function calculate(Collector $noPayLeaveAllowanceCollector):self{
        $this->collector = $noPayLeaveAllowanceCollector;

        foreach($noPayLeaveAllowanceCollector->list() as $noPayLeave){
            $this->totalNoPayLeave = $this->totalNoPayLeave + (float)$noPayLeave->amount();
        }
        return $this;
    }

    public function totalNoPayLeaveAllowance():float{
        return $this->totalNoPayLeave;
    }

    public function noPayLeaveAllowances():Collector{
        return $this->collector;
    }
}