<?php
namespace src\module\allowance\logic;

use src\module\allowance\repository\AllowanceRepository;

class ListAllowance{
    protected AllowanceRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceRepository();
    }
    
    public function allowances(){
        return $this->repo->listAllowances([
            'hide' => false
        ]);
    }
}