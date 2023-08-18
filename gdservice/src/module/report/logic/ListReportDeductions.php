<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\DeductionRepository;

class ListReportDeductions{
    protected DeductionRepository $repo;

    public function __construct(){
        $this->repo = new DeductionRepository();
    }

    public function deductionsByReport(Id $reportId):Collector{
        return $this->repo->listDeductions([
            'hide' => false,
            'reportId' => $reportId
        ]);
    }
}