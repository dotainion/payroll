<?php
namespace src\module\report\logic;

use src\infrastructure\Id;
use src\module\report\repository\OvertimeRepository;

class DeleteReportOvertime{
    protected OvertimeRepository $repo;

    public function __construct(){
        $this->repo = new OvertimeRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteOvertime($id);
    }
}