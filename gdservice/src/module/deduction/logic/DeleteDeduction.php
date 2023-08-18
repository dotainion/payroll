<?php
namespace src\module\deduction\logic;

use src\infrastructure\Id;
use src\module\deduction\repository\DeductionRepository;

class DeleteDeduction{
    protected DeductionRepository $repo;

    public function __construct(){
        $this->repo = new DeductionRepository();
    }
    
    public function delete(Id $id){
        return $this->repo->deleteDeduction($id);
    }
}