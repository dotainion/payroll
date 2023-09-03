<?php
namespace src\module\deduction\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\deduction\logic\DeleteDeduction;
use src\module\deduction\logic\FetchDeduction;

class DeleteDeductionService extends Service{
    protected FetchDeduction $fetch;
    protected DeleteDeduction $deduction;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchDeduction();
        $this->deduction = new DeleteDeduction();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Deduction not found.');

        $idObj = new Id();
        $idObj->set($id);
        
        $collector = $this->fetch->deduction($idObj);

        $this->deduction->delete($idObj);
        
        $this->setOutput($collector);
        return $this;
    }
}