<?php
namespace src\module\bank\objects;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Bank implements IObjects{
    protected Id $id;
    protected string $name;
    protected bool $hide;

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

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setName(string $name):void{
        Assert::stringNotEmpty($name, 'Name is required.');
        $this->name = $name;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}

