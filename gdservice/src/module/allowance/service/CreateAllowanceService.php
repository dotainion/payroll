<?php
namespace src\module\allowance\service;

use src\infrastructure\Service;
use src\module\allowance\logic\BuildAllowance;
use src\module\allowance\logic\CreateAllowance;

class CreateAllowanceService extends Service{
    protected CreateAllowance $allowance;

    public function __construct(){
        parent::__construct();
        $this->allowance = new CreateAllowance();
    }
    
    public function process($name, $type, $rate, $amount, $rateAmount){
        $collector = (new BuildAllowance())->toFactory([[
            'hide' => false,
            'name' => $name, 
            'type' => $type, 
            'rate' => $rate, 
            'amount' => $amount, 
            'rateAmount' => $rateAmount
        ]]);

        $this->allowance->create($collector->first());

        $this->setOutput($collector->first());
        return $this;
    }
}