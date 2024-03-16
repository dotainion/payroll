<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Period;
use src\module\report\repository\ReportRepository;

class ListReportPeriods{
    protected ReportRepository $repo;
    protected Collector $collector;

    public function __construct(){
        $this->repo = new ReportRepository();
        $this->collector = new Collector();
    }

    private function _included(DateHelper $form, DateHelper $to):bool{
        foreach($this->collector->list() as $period){
            if($period->from()->toString() === $form->toString() && $period->to()->toString() === $to->toString()){
                return true;
            }
        }
        return false;
    }

    public function periods():Collector{
        $collector = $this->repo->listReports([
            'hide' => false,
            'from' => (new DateHelper())->new()->subDays(365)->toString(), 
            'to' => (new DateHelper())->new()->toString(),
            'approved' => true
        ]);

        foreach($collector->list() as $report){
            if(!$this->_included($report->periodFrom(), $report->periodTo())){
                $this->collector->add(new Period($report->id(), $report->periodFrom(), $report->periodTo()));
            }
        }

        return $this->collector;
    }
}