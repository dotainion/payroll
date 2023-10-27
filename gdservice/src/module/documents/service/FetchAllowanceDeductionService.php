<?php
namespace src\module\documents\service;

use src\infrastructure\documents\AllowDeducIdLink;
use src\infrastructure\Service;
use src\module\deduction\factory\DeductionFactory;

class FetchAllowanceDeductionService extends Service{
    protected DeductionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DeductionFactory();
    }
    
    public function process(){
        $this->setOutput(new AllowDeducIdLink());
        return $this;
    }
}