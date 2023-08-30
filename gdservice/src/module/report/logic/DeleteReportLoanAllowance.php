<?php
namespace src\module\report\logic;

use src\infrastructure\Id;
use src\module\report\repository\LoanAllowanceRepository;

class DeleteReportLoanAllowance{
    protected LoanAllowanceRepository $repo;

    public function __construct(){
        $this->repo = new LoanAllowanceRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteLoanAllowance($id);
    }
}