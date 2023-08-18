<?php
namespace src\module\allowance\logic;

use src\module\allowance\objects\Allowance;
use src\module\allowance\repository\AllowanceRepository;

class EditAllowance{
    protected AllowanceRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceRepository();
    }
    
    public function edit(Allowance $allowance){
        return $this->repo->edit($allowance);
    }
}