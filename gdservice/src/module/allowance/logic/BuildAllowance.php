<?php
namespace src\module\allowance\logic;

use src\infrastructure\documents\HandleCostAndRates;
use src\infrastructure\Id;
use src\module\allowance\factory\AllowanceFactory;

class BuildAllowance{
    protected AllowanceFactory $factory;

    public function __construct(){
        $this->factory = new AllowanceFactory();
    }
    
    public function toFactory(&$allowances){
        $index = 0;
        foreach($allowances as $a){
            $id = new Id();
            $handler = new HandleCostAndRates($a['name'], $a['type'], $a['rate'], $a['amount'], $a['rateAmount'], 'Allowance');
            $handler->setId($id->isValid($a['id']??'') ? $a['id'] : $id->new()->toString());
            $allowance = $this->factory->mapResult([
                'id' => $handler->id()->toString(),
                'name' => $handler->name(),
                'type' => $handler->type(),
                'rate' => $handler->rate(),
                'hide' => false,
                'amount' => $handler->amount(),
                'rateAmount' => $handler->rateAmount()
            ]);
            $allowances[$index]['id'] = $handler->id()->toString();
            $index ++;
            $this->factory->add($allowance);
        }
        return $this->factory;
    }
}