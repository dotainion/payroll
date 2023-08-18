<?php
namespace src\module\departments\objects;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Department implements IObjects{
    protected Id $id; 
    protected string $name;

    function __construct(){
        $this->id = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function name():string{
        return $this->name;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setName(string $name):void{
        Assert::stringNotEmpty($name, 'Department name required.');
        $this->name = $name;
    }
}