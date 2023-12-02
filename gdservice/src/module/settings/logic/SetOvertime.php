<?php
namespace src\module\settings\logic;

use src\module\settings\objects\Overtime;
use src\module\settings\repository\OvertimeRepository;

class SetOvertime{
    protected FetchSickLeave $fetch;
    protected OvertimeRepository $repo;

    public function __construct(){
        $this->fetch = new FetchSickLeave();
        $this->repo = new OvertimeRepository();
    }

    public function setOvertime(Overtime $overtime):void{
        $collector = $this->repo->listOvertimeSettings(['id' => $overtime->id()]);
        if($collector->hasItem()){
            $this->repo->edit($overtime);
        }else{
            $this->repo->create($overtime);
        }
    }
}