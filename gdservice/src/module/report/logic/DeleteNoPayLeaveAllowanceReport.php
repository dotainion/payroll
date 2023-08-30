<?php
namespace src\module\report\logic;

use src\infrastructure\Id;
use src\module\report\repository\NoPayLeaveAllowanceRepository;

class DeleteNoPayLeaveAllowanceReport{
    protected NoPayLeaveAllowanceRepository $repo;

    public function __construct(){
        $this->repo = new NoPayLeaveAllowanceRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteNopayLeave($id);
    }
}