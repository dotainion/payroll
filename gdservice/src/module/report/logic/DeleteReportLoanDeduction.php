<?php
namespace src\module\report\logic;

use src\infrastructure\Id;
use src\module\report\repository\LoanDeductionRepository;

class DeleteReportLoanDeduction{
    protected LoanDeductionRepository $repo;

    public function __construct(){
        $this->repo = new LoanDeductionRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteLoanDeduction($id);
    }
}