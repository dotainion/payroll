<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\DeductionRepository;

class FetchDeductionReport{
    protected DeductionRepository $repo;

    public function __construct(){
        $this->repo = new DeductionRepository();
    }

    public function deduction(Id $id):Collector{
        return $this->repo->listDeductions([
            'hide' => false,
            'id' => $id
        ]);
    }
}