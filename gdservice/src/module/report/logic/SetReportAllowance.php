<?php
namespace src\module\report\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\objects\Allowance;
use src\module\report\repository\AllowanceRepository;

class SetReportAllowance{
    protected AllowanceRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceRepository();
    }

    private function _assertAllowanceExist(Id $id):bool{
        $collector = $this->repo->listAllowances(['id' => $id, 'hide' => false]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Allowance not found.');
        }
        return true;
    }

    public function create(Allowance $allowance):void{
        $this->repo->create($allowance);
    }

    public function massCreate(Collector $collector):void{
        foreach($collector->list() as $allowance){
            $this->create($allowance);
        }
    }

    public function edit(Allowance $allowance):void{
        $this->_assertAllowanceExist($allowance->id());
        $this->repo->edit($allowance);
    }

    public function massEdit(Collector $collector):void{
        foreach($collector->list() as $allowance){
            $this->edit($allowance);
        }
    }
}