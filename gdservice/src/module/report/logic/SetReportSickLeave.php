<?php
namespace src\module\report\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\objects\SickLeave;
use src\module\report\repository\SickLeaveRepository;

class SetReportSickLeave{
    protected SickLeaveRepository $repo;

    public function __construct(){
        $this->repo = new SickLeaveRepository();
    }

    private function _assertAllowanceExist(Id $id):bool{
        $collector = $this->repo->listSickLeave(['id' => $id, 'hide' => false]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Sick leave not found.');
        }
        return true;
    }

    public function create(SickLeave $sickLeave):void{
        $this->repo->create($sickLeave);
    }

    public function massCreate(Collector $collector):void{
        foreach($collector->list() as $sickLeave){
            $this->create($sickLeave);
        }
    }

    public function edit(SickLeave $sickLeave):void{
        $this->_assertAllowanceExist($sickLeave->id());
        $this->repo->edit($sickLeave);
    }

    public function editOrCreateIfNotExist(SickLeave $sickLeave):void{
        $collector = $this->repo->listSickLeave(['id' => $sickLeave->id(), 'hide' => false]);
        if(!$collector->hasItem()){
            $this->create($sickLeave);
            return;
        }
        $this->repo->edit($sickLeave);
    }

    public function massEdit(Collector $collector, bool $createIfNotExisting=false):void{
        foreach($collector->list() as $sickLeave){
            if($createIfNotExisting){
                $this->editOrCreateIfNotExist($sickLeave);
            }else{
                $this->edit($sickLeave);
            }
        }
    }
}