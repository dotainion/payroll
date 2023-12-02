<?php
namespace src\module\settings\logic;

use src\infrastructure\IId;
use src\module\settings\repository\OvertimeRepository;

class DeleteOvertime{
    protected OvertimeRepository $repo;

    public function __construct(){
        $this->repo = new OvertimeRepository();
    }

    public function delete(IId $id):void{
        $this->repo->deleteOvertime($id);
    }
}