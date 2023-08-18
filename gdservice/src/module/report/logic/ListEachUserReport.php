<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\module\report\repository\ReportRepository;

class ListEachUserReport{
    protected ReportRepository $repo;
    protected Collector $collector;

    public function __construct(){
        $this->repo = new ReportRepository();
        $this->collector = new Collector();
    }

    private function _reportByUserAndDate(Collector $users, DateHelper $from, DateHelper $to):Collector{
        foreach($users->list() as $user){
            $collector = $this->repo->listReports([
                'hide' => false,
                'userId' => $user->id(),
                'from'=> $from->toString(), 
                'to'=> $to->toString()
            ]);
            if($collector->hasItem()){
                $this->collector->add($collector->last());
            }
        }
        return $this->collector;
    }

    public function eachReports(Collector $users):Collector{
        $from = (new DateHelper())->new()->subDays(365);
        $to = (new DateHelper())->new();
        return $this->_reportByUserAndDate($users, $from, $to);
    }

    public function searchEachReports(Collector $users, DateHelper $from, DateHelper $to):Collector{
        return $this->_reportByUserAndDate($users, $from, $to);
    }

    public function eachByReportIdArray(array $reportIdArray):Collector{
        return $this->repo->listReports([
            'hide' => false,
            'reportId'=> $reportIdArray, 
        ]);
    }
}