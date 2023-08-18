<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\AllowanceRepository;

class ListReportAllowances{
    protected AllowanceRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceRepository();
    }

    public function allowancesByReport(Id $reportId):Collector{
        return $this->repo->listAllowances([
            'hide' => false,
            'reportId' => $reportId
        ]);
    }
}