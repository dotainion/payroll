<?php
namespace src\module\allowanceDeductionIdLink\logic;

use src\module\allowanceDeductionIdLink\repository\AllowanceDeductionIdLinkRepository;

class ListAllowanceDeductionIdLink{
    protected AllowanceDeductionIdLinkRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceDeductionIdLinkRepository();
    }
    
    public function options(){
        return $this->repo->listOptions();
    }
}