<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;

class CalculateReportOvertime{
    protected float $totalOvertime = 0;
    protected Collector $collector;

    public function __construct(){
    }

    public function calculate(Collector $overtimeCollector):self{
        $this->collector = $overtimeCollector;

        foreach($overtimeCollector->list() as $overtime){
            $this->totalOvertime = $this->totalOvertime + (float)$overtime->totalAmount();
        }
        return $this;
    }

    public function totalOvertime():float{
        return $this->totalOvertime;
    }

    public function reportOvertimes():Collector{
        return $this->collector;
    }
}