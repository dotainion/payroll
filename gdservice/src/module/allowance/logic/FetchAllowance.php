<?php
namespace src\module\allowance\logic;

use src\infrastructure\Id;
use src\module\allowance\repository\AllowanceRepository;

class FetchAllowance{
    protected AllowanceRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceRepository();
    }
    
    public function allowance(Id $id){
        return $this->repo->listAllowances([
            'hide' => false,
            'id' => $id
        ]);
    }
}