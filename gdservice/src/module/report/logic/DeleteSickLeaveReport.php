<?php
namespace src\module\report\logic;

use src\infrastructure\Id;
use src\module\report\repository\SickLeaveRepository;

class DeleteSickLeaveReport{
    protected SickLeaveRepository $repo;

    public function __construct(){
        $this->repo = new SickLeaveRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteSickLeave($id);
    }
}