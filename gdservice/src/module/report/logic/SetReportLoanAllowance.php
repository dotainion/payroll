<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\module\report\objects\LoanAllowance;
use src\module\report\repository\LoanAllowanceRepository;

class SetReportLoanAllowance{
    protected LoanAllowanceRepository $repo;

    public function __construct(){
        $this->repo = new LoanAllowanceRepository();
    }

    public function create(LoanAllowance $loanAllowance):void{
        $this->repo->create($loanAllowance);
    }

    public function massCreate(Collector $collector):void{
        foreach($collector->list() as $loanAllowance){
            $this->create($loanAllowance);
        }
    }

    public function edit(LoanAllowance $loanAllowance):void{
        $this->repo->edit($loanAllowance);
    }

    public function massEdit(Collector $collector):void{
        foreach($collector->list() as $loanAllowance){
            $this->edit($loanAllowance);
        }
    }
}