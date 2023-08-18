<?php
namespace src\module\allowance\logic;

use src\module\allowance\objects\Allowance;
use src\module\allowance\repository\AllowanceRepository;

class CreateAllowance{
    protected AllowanceRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceRepository();
    }
    
    public function create(Allowance $allowance){
        return $this->repo->create($allowance);
    }
}