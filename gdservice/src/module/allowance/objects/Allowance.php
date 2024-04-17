<?php
namespace src\module\allowance\objects;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Allowance implements IObjects{
    protected Id $id;
    protected string $name;
    protected string $type;
    protected string $rate;
    protected string $amount;
    protected string $rateAmount;
    protected bool $hide;
    protected bool $taxExemption;

    public function __construct(){
        $this->id = new Id();
    }
        
    public function id():IId{
        return $this->id;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function name(){
        return $this->name;
    }
    
    public function type(){
        return $this->type;
    }
    
    public function rate(){
        return $this->rate;
    }
    
    public function rateAmount(){
        return $this->rateAmount;
    }
    
    public function amount(){
        return $this->amount;
    }

    public function taxExemption():bool{
        return $this->taxExemption;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setName(string $name):void{
        Assert::stringNotEmpty($name, 'Name is required.');
        $this->name = $name;
    }
    
    public function setType(string $type):void{
        $this->type = $type;
    }

    public function setRate(string $rate):void{
        $this->rate = $rate;
    }
    
    public function setAmount(string $amount):void{
        Assert::stringNotEmpty($amount, 'Amount is required.');
        $this->amount = $amount;
    }
    
    public function setRateAmount(string $rateAmount):void{
        $this->rateAmount = $rateAmount;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }

    public function setTaxExemption(bool $taxExemption):void{
        $this->taxExemption = $taxExemption;
    }
}

