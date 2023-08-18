<?php
namespace src\module\allowance\logic;

use src\infrastructure\Id;
use src\module\allowance\repository\AllowanceRepository;

class DeleteAllowance{
    protected AllowanceRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceRepository();
    }
    
    public function delete(Id $id){
        return $this->repo->deleteAllowance($id);
    }
}