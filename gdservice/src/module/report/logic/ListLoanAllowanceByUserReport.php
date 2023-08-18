<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\LoanAllowanceRepository;

class ListLoanAllowanceByUserReport{
    protected LoanAllowanceRepository $repo;

    public function __construct(){
        $this->repo = new LoanAllowanceRepository();
    }

    public function listByUser(Id $userId):Collector{
        return $this->repo->listLoanAllowances([
            'hide' => false,
            'userId' => $userId
        ]);
    }

    public function allowancesByReport(Id $reportId):Collector{
        return $this->repo->listLoanAllowances([
            'hide' => false,
            'reportId' => $reportId
        ]);
    }
}