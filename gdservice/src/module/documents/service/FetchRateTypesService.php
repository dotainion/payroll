<?php
namespace src\module\documents\service;

use src\infrastructure\documents\RateTypes;
use src\infrastructure\Service;
use src\module\deduction\factory\DeductionFactory;

class FetchRateTypesService extends Service{
    protected DeductionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DeductionFactory();
    }
    
    public function process(){
        $this->setOutput(new RateTypes());
        return $this;
    }
}