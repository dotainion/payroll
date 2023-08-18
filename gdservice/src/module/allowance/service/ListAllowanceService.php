<?php
namespace src\module\allowance\service;

use src\infrastructure\documents\CostTypes;
use src\infrastructure\documents\RateTypes;
use src\infrastructure\Service;
use src\module\allowance\logic\ListAllowance;

class ListAllowanceService extends Service{
    protected ListAllowance $allowance;

    public function __construct(){
        parent::__construct();
        $this->allowance = new ListAllowance();
    }
    
    public function process(){
        $c = new CostTypes();
        $t = new RateTypes();
        $collector = $this->allowance->allowances();

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