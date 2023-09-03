<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\OvertimeRepository;

class ListReportOvertime{
    protected OvertimeRepository $repo;

    public function __construct(){
        $this->repo = new OvertimeRepository();
    }

    public function overtimeByReport(Id $reportId):Collector{
        return $this->repo->listOvertime([
            'hide' => false,
            'reportId' => $reportId
        ]);
    }
}