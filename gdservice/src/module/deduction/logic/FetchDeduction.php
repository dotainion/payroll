<?php
namespace src\module\deduction\logic;

use src\infrastructure\Id;
use src\module\deduction\repository\DeductionRepository;

class FetchDeduction{
    protected DeductionRepository $repo;

    public function __construct(){
        $this->repo = new DeductionRepository();
    }
    
    public function deduction(Id $id){
        return $this->repo->listDeductions([
            'hide' => false,
            'id' => $id
        ]);
    }
}