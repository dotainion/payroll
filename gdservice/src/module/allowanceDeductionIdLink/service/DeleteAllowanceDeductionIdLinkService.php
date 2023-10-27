<?php
namespace src\module\allowanceDeductionIdLink\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\allowanceDeductionIdLink\factory\AllowanceDeductionIdLinkFactory;
use src\module\allowanceDeductionIdLink\logic\DeleteAllowanceDeductionIdLink;
use src\module\allowanceDeductionIdLink\logic\FetchAllowanceDeductionIdLink;

class DeleteAllowanceDeductionIdLinkService extends Service{
    protected DeleteAllowanceDeductionIdLink $option;
    protected FetchAllowanceDeductionIdLink $fetch;

    public function __construct(){
        parent::__construct();
        $this->option = new DeleteAllowanceDeductionIdLink();
        $this->fetch = new FetchAllowanceDeductionIdLink();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Allowance|Deduction link not found.');

        $idObj = new Id();
        $idObj->set($id);

        $collector = $this->fetch->option($idObj);

        $this->option->delete($idObj);

        $this->setOutput($collector);
        return $this;
    }
}