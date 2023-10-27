<?php
namespace src\module\allowanceDeductionIdLink\logic;

use src\module\allowanceDeductionIdLink\objects\AllowanceDeductionIdLink;
use src\module\allowanceDeductionIdLink\repository\AllowanceDeductionIdLinkRepository;

class SetAllowanceDeductionIdLink{
    protected AllowanceDeductionIdLinkRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceDeductionIdLinkRepository();
    }
    
    public function set(AllowanceDeductionIdLink $option):void{
        $collector = $this->repo->listOptions([
            'id' => $option->id(),
        ]);
        if($collector->hasItem()){
            $this->repo->edit($option);
            return;
        }
        $this->repo->create($option);
    }
}