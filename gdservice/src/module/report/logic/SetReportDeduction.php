<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\module\report\objects\Deduction;
use src\module\report\repository\DeductionRepository;

class SetReportDeduction{
    protected DeductionRepository $repo;

    public function __construct(){
        $this->repo = new DeductionRepository();
    }

    public function create(Deduction $deduction):void{
        $this->repo->create($deduction);
    }

    public function massCreate(Collector $collector):void{
        foreach($collector->list() as $deduction){
            $this->create($deduction);
        }
    }

    public function edit(Deduction $deduction):void{
        $this->repo->edit($deduction);
    }

    public function massEdit(Collector $collector):void{
        foreach($collector->list() as $deduction){
            $this->edit($deduction);
        }
    }
}