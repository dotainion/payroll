<?php
namespace src\module\deduction\logic;

use src\infrastructure\documents\HandleCostAndRates;
use src\infrastructure\Id;
use src\module\deduction\factory\DeductionFactory;

class BuildDeduction{
    protected DeductionFactory $factory;

    public function __construct(){
        $this->factory = new DeductionFactory();
    }
    
    public function toFactory(&$deductions){
        $index = 0;
        foreach($deductions as $a){
            $id = new Id();
            $handler = new HandleCostAndRates($a['name'], $a['type'], $a['rate'], $a['amount'], $a['rateAmount'], 'Deduction');
            $handler->setId($id->isValid($a['id']??'') ? $a['id'] : $id->new()->toString());
            $deduction = $this->factory->mapResult([
                'id' => $handler->id()->toString(),
                'name' => $handler->name(),
                'type' => $handler->type(),
                'rate' => $handler->rate(),
                'hide' => false,
                'amount' => $handler->amount(),
                'rateAmount' => $handler->rateAmount()
            ]);
            $deductions[$index]['id'] = $handler->id()->toString();
            $index ++;
            $this->factory->add($deduction);
        }
        return $this->factory;
    }
}