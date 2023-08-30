<?php
namespace src\module\report\logic;

use src\infrastructure\Id;
use src\module\report\repository\NoPayLeaveDeductionRepository;

class DeleteNoPayLeaveDeductionReport{
    protected NoPayLeaveDeductionRepository $repo;

    public function __construct(){
        $this->repo = new NoPayLeaveDeductionRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteNopayLeave($id);
    }
}