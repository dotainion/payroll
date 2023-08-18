<?php
namespace src\infrastructure\documents;

use src\infrastructure\Assert;
use src\infrastructure\Id;

class HandleCostAndRates{
    protected Id $id;
    protected string $name;
    protected string $type;
    protected string $rate;
    protected string $amount;
    protected string $rateAmount;

    public function __construct($name, $type, $rate, $amount, $rateAmount, $errorMsg=''){
        $this->id = new Id();
        $this->name = $name;
        $this->type = $type;
        $this->rate = $rate;
        $this->amount = $amount;
        $this->rateAmount = $rateAmount;

        $errorMsg && $errorMsg .= ' ';

        Assert::stringNotEmpty($name, $errorMsg . 'Name is required.');
        Assert::stringNotEmpty($amount, $errorMsg . 'Amount is required.');
        Assert::inArray($type, ['1', '2', '3'], $errorMsg . 'Invlid type.');
        if((new CostTypes())->rate()['value'] === $type){
            Assert::inArray($rate, ['h', 'd', 'w', 'm', 'y'], $errorMsg . 'Invlid rate.');
            Assert::stringNotEmpty($rateAmount, $errorMsg . 'Rate amount is required.');
        }else{
            $this->rate = '';
            $this->rateAmount = '';
        }
    }

    public function id():Id{
        return $this->id;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function name():string{
        return $this->name;
    }

    public function type():string{
        return $this->type;
    }

    public function rate():string{
        return $this->rate;
    }

    public function amount():string{
        return $this->amount;
    }

    public function rateAmount():string{
        return $this->rateAmount;
    }
}
