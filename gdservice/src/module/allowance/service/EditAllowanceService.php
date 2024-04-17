<?php
namespace src\module\allowance\service;

use src\infrastructure\Service;
use src\module\allowance\logic\BuildAllowance;
use src\module\allowance\logic\EditAllowance;

class EditAllowanceService extends Service{
    protected EditAllowance $allowance;

    public function __construct(){
        parent::__construct();
        $this->allowance = new EditAllowance();
    }
    
    public function process($id, $name, $type, $rate, $amount, $rateAmount, $taxExemption){
        $allowances = [[
            'id' => $id,
            'hide' => false,
            'name' => $name, 
            'type' => $type, 
            'rate' => $rate, 
            'amount' => $amount, 
            'rateAmount' => $rateAmount,
            'taxExemption' => $taxExemption
        ]];
        $collector = (new BuildAllowance())->toFactory($allowances);

        $this->allowance->edit($collector->first());

        $this->setOutput($collector->first());
        return $this;
    }
}