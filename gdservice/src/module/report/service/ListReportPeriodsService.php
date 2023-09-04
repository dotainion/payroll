<?php
namespace src\module\report\service;

use src\infrastructure\Service;
use src\module\report\logic\ListReportPeriods;

class ListReportPeriodsService extends Service{
    protected ListReportPeriods $periods;

    public function __construct(){
        parent::__construct();
        $this->periods = new ListReportPeriods();
    }
    
    public function process(){
        $collector = $this->periods->periods();
        $this->setOutput($collector);
        return $this;
    }
}