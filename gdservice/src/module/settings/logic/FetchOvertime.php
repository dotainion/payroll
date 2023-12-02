<?php
namespace src\module\settings\logic;

use src\infrastructure\Collector;
use src\infrastructure\IId;
use src\module\settings\repository\OvertimeRepository;

class FetchOvertime{
    protected OvertimeRepository $repo;

    public function __construct(){
        $this->repo = new OvertimeRepository();
    }

    public function fetchOvertime(IId $id):Collector{
        return $this->repo->listOvertimeSettings([
            'id' => $id
        ]);
    }
}