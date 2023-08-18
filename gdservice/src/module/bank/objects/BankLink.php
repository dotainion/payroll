<?php
namespace src\module\bank\objects;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class BankLink implements IObjects{
    protected Id $id;
    protected Id $bankId;
    protected Id $userId;
    protected string $number;
    protected ?string $name = null;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
        $this->bankId = new Id();
        $this->userId = new Id();
    }
        
    public function id():IId{
        return $this->id;
    }

    public function hide():bool{
        return $this->hide;
    }
    
    public function userId(){
        return $this->userId;
    }
    
    public function bankId(){
        return $this->bankId;
    }
    
    public function number(){
        return $this->number;
    }
    
    public function name(){
        return $this->name;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setBankId(string $bankId):void{
        $this->bankId->set($bankId);
    }

    public function setUserId(string $userId):void{
        $this->userId->set($userId);
    }
    
    public function setNumber(string $number):void{
        Assert::stringNotEmpty($number, 'Bank number is required.');
        $this->number = $number;
    }
    
    public function setName(string $name):void{
        Assert::stringNotEmpty($name, 'Bank name is required.');
        $this->name = $name;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}

