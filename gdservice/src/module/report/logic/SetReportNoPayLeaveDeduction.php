<?php
namespace src\module\report\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\objects\NoPayLeaveDeduction;
use src\module\report\repository\NoPayLeaveDeductionRepository;

class SetReportNoPayLeaveDeduction{
    protected NoPayLeaveDeductionRepository $repo;

    public function __construct(){
        $this->repo = new NoPayLeaveDeductionRepository();
    }

    private function _assertAllowanceExist(Id $id):bool{
        $collector = $this->repo->listNopayLeave(['id' => $id, 'hide' => false]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('No pay leave deduction not found.');
        }
        return true;
    }

    public function create(NoPayLeaveDeduction $noPayLeave):void{
        $this->repo->create($noPayLeave);
    }

    public function massCreate(Collector $collector):void{
        foreach($collector->list() as $noPayLeave){
            $this->create($noPayLeave);
        }
    }

    public function edit(NoPayLeaveDeduction $noPayLeave):void{
        $this->_assertAllowanceExist($noPayLeave->id());
        $this->repo->edit($noPayLeave);
    }

    public function editOrCreateIfNotExist(NoPayLeaveDeduction $noPayLeave):void{
        $collector = $this->repo->listNopayLeave(['id' => $noPayLeave->id(), 'hide' => false]);
        if(!$collector->hasItem()){
            $this->create($noPayLeave);
            return;
        }
        $this->repo->edit($noPayLeave);
    }

    public function massEdit(Collector $collector, bool $createIfNotExisting=false):void{
        foreach($collector->list() as $noPayLeave){
            if($createIfNotExisting){
                $this->editOrCreateIfNotExist($noPayLeave);
            }else{
                $this->edit($noPayLeave);
            }
        }
    }
}