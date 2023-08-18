<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;

class CalculateReportSickLeave{
    protected float $totalSickLeave = 0;
    protected Collector $collector;

    public function __construct(){
    }

    public function calculate(Collector $sickLeaveCollector):self{
        $this->collector = $sickLeaveCollector;

        foreach($sickLeaveCollector->list() as $sickLeave){
            $this->totalSickLeave = $this->totalSickLeave + (float)$sickLeave->amount();
        }
        return $this;
    }

    public function totalSickLeave():float{
        return $this->totalSickLeave;
    }

    public function sickLeaves():Collector{
        return $this->collector;
    }
}