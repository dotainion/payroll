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

    public function editOrCreateIfNotExist(LoanDeduction $loanDeduction):void{
        $collector = $this->repo->listLoanDeductions(['id' => $loanDeduction->id(), 'hide' => false]);
        if(!$collector->hasItem()){
            $this->create($loanDeduction);
            return;
        }
        $this->repo->edit($loanDeduction);
    }

    public function massEdit(Collector $collector, bool $createIfNotExisting=false):void{
        foreach($collector->list() as $deduction){
            if($createIfNotExisting){
                $this->editOrCreateIfNotExist($deduction);
            }else{
                $this->edit($deduction);
            }
        }
    }
}