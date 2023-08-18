<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\SickLeaveRepository;

class ListSickLeave{
    protected SickLeaveRepository $repo;

    public function __construct(){
        $this->repo = new SickLeaveRepository();
    }

    public function sickLeaves(Id $reportId):Collector{
        return $this->repo->listSickLeave([
            'hide' => false,
            'reportId' => $reportId
        ]);
    }
}