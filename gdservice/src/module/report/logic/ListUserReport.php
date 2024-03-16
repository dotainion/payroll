<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\report\repository\ReportRepository;

class ListUserReport{
    protected ReportRepository $repo;

    public function __construct(){
        $this->repo = new ReportRepository();
    }

    public function reports(Id $userId):Collector{
        return $this->repo->listReports([
            'hide' => false,
            'userId' => $userId,
            'approved' => true
        ]);
    }

    public function reportsByDateRange(Id $userId, DateHelper $from, DateHelper $to):Collector{
        return $this->repo->listReports([
            'hide' => false,
            'userId' => $userId,
            'from'=> $from->toString(), 
            'to'=> $to->toString(),
            'approved' => true
        ]);
    }
}