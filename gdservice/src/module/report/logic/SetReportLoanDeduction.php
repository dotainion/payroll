<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\module\report\objects\LoanDeduction;
use src\module\report\repository\LoanDeductionRepository;

class SetReportLoanDeduction{
    protected LoanDeductionRepository $repo;

    public function __construct(){
        $this->repo = new LoanDeductionRepository();
    }

    public function create(LoanDeduction $loanDeduction):void{
        $this->repo->create($loanDeduction);
    }

    public function massCreate(Collector $collector):void{
        foreach($collector->list() as $deduction){
            $this->create($deduction);
        }
    }

    public function edit(LoanDeduction $loanDeduction):void{
        $this->repo->edit($loanDeduction);
    }

    public function massEdit(Collector $collector):void{
        foreach($collector->list() as $deduction){
            $this->edit($deduction);
        }
    }
}