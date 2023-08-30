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

    public function editOrCreateIfNotExist(LoanAllowance $allowance):void{
        $collector = $this->repo->listLoanAllowances(['id' => $allowance->id(), 'hide' => false]);
        if(!$collector->hasItem()){
            $this->create($allowance);
            return;
        }
        $this->repo->edit($allowance);
    }

    public function massEdit(Collector $collector, bool $createIfNotExisting=false):void{
        foreach($collector->list() as $loanAllowance){
            if($createIfNotExisting){
                $this->editOrCreateIfNotExist($loanAllowance);
            }else{
                $this->edit($loanAllowance);
            }
        }
    }
}