<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\LoanDeductionRepository;

class ListLoanDeductionByUserReport{
    protected LoanDeductionRepository $repo;

    public function __construct(){
        $this->repo = new LoanDeductionRepository();
    }

    public function listByUser(Id $userId):Collector{
        return $this->repo->listLoanDeductions([
            'hide' => false,
            'userId' => $userId
        ]);
    }

    public function deductionsByReport(Id $reportId):Collector{
        return $this->repo->listLoanDeductions([
            'hide' => false,
            'reportId' => $reportId
        ]);
    }
}