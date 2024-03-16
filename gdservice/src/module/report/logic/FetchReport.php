<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\ReportRepository;

class FetchReport{
    protected ReportRepository $repo;

    public function __construct(){
        $this->repo = new ReportRepository();
    }

    public function report(Id $reportId, bool $approved = true):Collector{
        return $this->repo->listReports([
            'hide' => false,
            'reportId' => $reportId,
            'approved' => $approved
        ]);
    }
}