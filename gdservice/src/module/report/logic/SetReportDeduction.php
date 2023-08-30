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

    public function editOrCreateIfNotExist(Deduction $deduction):void{
        $collector = $this->repo->listDeductions(['id' => $deduction->id(), 'hide' => false]);
        if(!$collector->hasItem()){
            $this->create($deduction);
            return;
        }
        $this->repo->edit($deduction);
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