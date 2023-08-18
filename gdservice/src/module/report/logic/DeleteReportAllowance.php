<?php
namespace src\module\report\logic;

use src\infrastructure\Id;
use src\module\report\repository\AllowanceRepository;

class DeleteReportAllowance{
    protected AllowanceRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteAllowance($id);
    }
}