<?php
namespace src\module\deduction\service;

use src\infrastructure\Service;
use src\module\deduction\logic\BuildDeduction;
use src\module\deduction\logic\EditDeduction;

class EditDeductionService extends Service{
    protected EditDeduction $deduction;

    public function __construct(){
        parent::__construct();
        $this->deduction = new EditDeduction();
    }
    
    public function process($id, $name, $type, $rate, $amount, $rateAmount){
        $deductions = [[
            'id' => $id,
            'name' => $name, 
            'type' => $type, 
            'rate' => $rate, 
            'hide' => false,
            'amount' => $amount, 
            'rateAmount' => $rateAmount
        ]];
        $collector = (new BuildDeduction())->toFactory($deductions);

        $this->deduction->edit($collector->first());

        $this->setOutput($collector->first());
        return $this;
    }
}