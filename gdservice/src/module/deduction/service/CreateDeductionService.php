<?php
namespace src\module\deduction\service;

use src\infrastructure\Service;
use src\module\deduction\logic\BuildDeduction;
use src\module\deduction\logic\CreateDeduction;

class CreateDeductionService extends Service{
    protected CreateDeduction $deduction;

    public function __construct(){
        parent::__construct();
        $this->deduction = new CreateDeduction();
    }
    
    public function process($name, $type, $rate, $amount, $rateAmount){
        $collector = (new BuildDeduction())->toFactory([[
            'name' => $name, 
            'type' => $type, 
            'rate' => $rate, 
            'hide' => false,
            'amount' => $amount, 
            'rateAmount' => $rateAmount
        ]]);

        $this->deduction->create($collector->first());

        $this->setOutput($collector->first());
        return $this;
    }
}