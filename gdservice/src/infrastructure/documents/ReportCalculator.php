<?php
namespace src\infrastructure\documents;

class ReportCalculator{
    protected int $amount;
    protected HandleCostAndRates $handler;

    public function __construct(HandleCostAndRates $handler){
        $this->handler = $handler;
        $this->_calculate();
    }

    private function _calculate():void{
        if($this->handler->type() === CostTypes::PERCENTAGE){

        }
    }
    
    public function getAmount():int{
        return $this->amount;
    }
}
