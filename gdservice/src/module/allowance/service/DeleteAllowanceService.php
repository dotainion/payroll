<?php
namespace src\module\allowance\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\allowance\logic\DeleteAllowance;

class DeleteAllowanceService extends Service{
    protected DeleteAllowance $allowance;

    public function __construct(){
        parent::__construct();
        $this->allowance = new DeleteAllowance();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Allowance not found.');
        $this->allowance->delete((new Id())->set($id));
        return $this;
    }
}