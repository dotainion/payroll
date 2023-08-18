<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\NoPayLeaveDeductionRepository;

class ListNoPayLeaveDeduction{
    protected NoPayLeaveDeductionRepository $repo;

    public function __construct(){
        $this->repo = new NoPayLeaveDeductionRepository();
    }

    public function noPayLeaves(Id $reportId):Collector{
        return $this->repo->listNopayLeave([
            'hide' => false,
            'reportId' => $reportId
        ]);
    }
}