<?php
namespace src\module\allowanceDeductionIdLink\service;

use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\allowanceDeductionIdLink\factory\AllowanceDeductionIdLinkFactory;
use src\module\allowanceDeductionIdLink\logic\SetAllowanceDeductionIdLink;

class SetAllowanceDeductionIdLinkService extends Service{
    protected SetAllowanceDeductionIdLink $option;
    protected AllowanceDeductionIdLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->option = new SetAllowanceDeductionIdLink();
        $this->factory = new AllowanceDeductionIdLinkFactory();
    }
    
    public function process($id, $cmd){
        Assert::validUuid($id, 'Option not found.');
        Assert::validAllowDeducOption($cmd);

        $option = $this->factory->mapResult([
            'id' => $id,
            'cmd' => $cmd
        ]);
        
        $this->option->set($option);

        $this->setOutput($option);
        return $this;
    }
}