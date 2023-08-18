<?php
namespace src\module\report\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\objects\NoPayLeaveAllowance;
use src\module\report\repository\NoPayLeaveAllowanceRepository;

class SetReportNoPayLeaveAllowance{
    protected NoPayLeaveAllowanceRepository $repo;

    public function __construct(){
        $this->repo = new NoPayLeaveAllowanceRepository();
    }

    private function _assertAllowanceExist(Id $id):bool{
        $collector = $this->repo->listNopayLeave(['id' => $id, 'hide' => false]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('No pay leave allowance not found.');
        }
        return true;
    }

    public function create(NoPayLeaveAllowance $noPayLeave):void{
        $this->repo->create($noPayLeave);
    }

    public function massCreate(Collector $collector):void{
        foreach($collector->list() as $noPayLeave){
            $this->create($noPayLeave);
        }
    }

    public function edit(NoPayLeaveAllowance $noPayLeave):void{
        $this->_assertAllowanceExist($noPayLeave->id());
        $this->repo->edit($noPayLeave);
    }

    public function massEdit(Collector $collector):void{
        foreach($collector->list() as $noPayLeave){
            $this->edit($noPayLeave);
        }
    }
}