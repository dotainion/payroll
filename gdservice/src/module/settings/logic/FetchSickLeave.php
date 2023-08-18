<?php
namespace src\module\settings\logic;

use src\infrastructure\Collector;
use src\module\settings\repository\SickLeaveRepository;

class FetchSickLeave{
    protected SickLeaveRepository $repo;

    public function __construct(){
        $this->repo = new SickLeaveRepository();
    }

    public function fetchSickLeave():Collector{
        return $this->repo->fetchSickLeaveSettings();
    }
}