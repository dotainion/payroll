<?php
namespace src\module\allowanceDeductionIdLink\logic;

use InvalidArgumentException;
use src\infrastructure\Id;
use src\module\allowanceDeductionIdLink\repository\AllowanceDeductionIdLinkRepository;

class DeleteAllowanceDeductionIdLink{
    protected AllowanceDeductionIdLinkRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceDeductionIdLinkRepository();
    }
    
    public function delete(Id $id):void{
        $collector = $this->repo->listOptions([
            'id' => $id,
        ]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Allowance|Deduction not found.');
        }
        $this->repo->deleteOption($id);
    }
}