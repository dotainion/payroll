<?php
namespace src\module\deduction\service;

use src\infrastructure\documents\CostTypes;
use src\infrastructure\documents\RateTypes;
use src\infrastructure\Service;
use src\module\deduction\logic\ListDeduction;

class ListDeductionService extends Service{
    protected ListDeduction $deduction;

    public function __construct(){
        parent::__construct();
        $this->deduction = new ListDeduction();
    }
    
    public function process(){
        $c = new CostTypes();
        $t = new RateTypes();
        $collector = $this->deduction->deductions();

        //this loop will switch to display name
        foreach($collector->list() as $allowance){
            foreach([$c->rate(), $c->percentage(), $c->dollarAmount()] as $type){
                if($type['value'] === $allowance->type()){
                    $allowance->setType($type['name']);
                    break;
                }
            }
            foreach([$t->hour(), $t->day(), $t->week(), $t->month(), $t->year()] as $rate){
                if($rate['value'] === $allowance->rate()){
                    $allowance->setRate($rate['name']);
                    break;
                }
            }
        }
        $this->setOutput($collector);
        return $this;
    }
}