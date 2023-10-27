<?php
namespace src\module\allowanceDeductionIdLink\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\allowanceDeductionIdLink\repository\AllowanceDeductionIdLinkRepository;

class FetchAllowanceDeductionIdLink{
    protected AllowanceDeductionIdLinkRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceDeductionIdLinkRepository();
    }
    
    public function option(Id $id):Collector{
        return $this->repo->listOptions([
            'id' => $id
        ]);
    }
}