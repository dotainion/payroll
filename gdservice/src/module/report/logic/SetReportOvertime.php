<?php
namespace src\module\report\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\objects\Overtime;
use src\module\report\repository\OvertimeRepository;

class SetReportOvertime{
    protected OvertimeRepository $repo;

    public function __construct(){
        $this->repo = new OvertimeRepository();
    }

    private function _assertAllowanceExist(Id $id):bool{
        $collector = $this->repo->listOvertime(['id' => $id, 'hide' => false]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Allowance not found.');
        }
        return true;
    }

    public function create(Overtime $overtime):void{
        $this->repo->create($overtime);
    }

    public function massCreate(Collector $collector):void{
        foreach($collector->list() as $allowance){
            $this->create($allowance);
        }
    }

    public function edit(Overtime $overtime):void{
        $this->_assertAllowanceExist($overtime->id());
        $this->repo->edit($overtime);
    }

    public function editOrCreateIfNotExist(Overtime $overtime):void{
        $collector = $this->repo->listOvertime(['id' => $overtime->id(), 'hide' => false]);
        if(!$collector->hasItem()){
            $this->create($overtime);
            return;
        }
        $this->repo->edit($overtime);
    }

    public function massEdit(Collector $collector, bool $createIfNotExisting=false):void{
        foreach($collector->list() as $overtime){
            if($createIfNotExisting){
                $this->editOrCreateIfNotExist($overtime);
            }else{
                $this->edit($overtime);
            }
        }
    }
}