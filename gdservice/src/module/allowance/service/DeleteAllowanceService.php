<?php
namespace src\module\allowance\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\allowance\logic\DeleteAllowance;
use src\module\allowance\logic\FetchAllowance;

class DeleteAllowanceService extends Service{
    protected FetchAllowance $fetch;
    protected DeleteAllowance $allowance;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchAllowance();
        $this->allowance = new DeleteAllowance();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Allowance not found.');

        $idObj = new Id();
        $idObj->set($id);
        
        $collector = $this->fetch->allowance($idObj);

        $this->allowance->delete($idObj);

        $this->setOutput($collector);
        return $this;
    }
}