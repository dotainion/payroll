<?php
namespace src\module\settings\logic;

use src\module\settings\objects\SickLeave;
use src\module\settings\repository\SickLeaveRepository;

class SetSickLeave{
    protected FetchSickLeave $fetch;
    protected SickLeaveRepository $repo;

    public function __construct(){
        $this->fetch = new FetchSickLeave();
        $this->repo = new SickLeaveRepository();
    }

    public function setSickLeave(SickLeave $sickLeave):void{
        $collector = $this->fetch->fetchSickLeave();
        if($collector->hasItem()){
            $this->repo->edit($sickLeave, $collector->first()->id());
        }else{
            $this->repo->create($sickLeave);
        }
    }
}