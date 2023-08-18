<?php
namespace src\module\deduction\logic;

use src\module\deduction\objects\Deduction;
use src\module\deduction\repository\DeductionRepository;

class EditDeduction{
    protected DeductionRepository $repo;

    public function __construct(){
        $this->repo = new DeductionRepository();
    }
    
    public function edit(Deduction $deduction){
        return $this->repo->edit($deduction);
    }
}