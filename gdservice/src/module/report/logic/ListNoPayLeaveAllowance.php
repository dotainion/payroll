<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\NoPayLeaveAllowanceRepository;

class ListNoPayLeaveAllowance{
    protected NoPayLeaveAllowanceRepository $repo;

    public function __construct(){
        $this->repo = new NoPayLeaveAllowanceRepository();
    }

    public function payLeaves(Id $reportId):Collector{
        return $this->repo->listNopayLeave([
            'hide' => false,
            'reportId' => $reportId
        ]);
    }
}