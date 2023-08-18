<?php
namespace src\module\deduction\logic;

use src\module\deduction\repository\DeductionRepository;

class ListDeduction{
    protected DeductionRepository $repo;

    public function __construct(){
        $this->repo = new DeductionRepository();
    }
    
    public function deductions(){
        return $this->repo->listDeductions([
            'hide' => false
        ]);
    }
}