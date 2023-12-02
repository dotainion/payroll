<?php
namespace src\module\settings\logic;

use src\infrastructure\Collector;
use src\module\settings\repository\OvertimeRepository;

class ListOvertime{
    protected OvertimeRepository $repo;

    public function __construct(){
        $this->repo = new OvertimeRepository();
    }

    public function list():Collector{
        return $this->repo->listOvertimeSettings();
    }
}