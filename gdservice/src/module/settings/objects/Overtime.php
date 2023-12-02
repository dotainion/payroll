<?php
namespace src\module\settings\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Overtime implements IObjects{
    protected Id $id;
    protected string $name;
    protected ?float $value=null;
    protected bool $active;
    protected Operan $prefix;
    protected Operan $suffix;
    protected Operator $operator;

    public function __construct(){
        $this->id = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function name():string{
        return $this->name;
    }

    public function value():?float{
        return $this->value;
    }

    public function active():bool{
        return $this->active;
    }

    public function prefix():Operan{
        return $this->prefix;
    }

    public function suffix():Operan{
        return $this->suffix;
    }
    
    public function operator():Operator{
        return $this->operator;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }

    public function setValue(float $value):void{
        $this->value = $value;
    }

    public function setActive(bool $active):void{
        $this->active = $active;
    }

    public function setPrefix(string $prefix):void{
        $this->prefix = new Operan($prefix, $this);
    }
    
    public function setSuffix(string $suffix):void{
        $this->suffix = new Operan($suffix, $this);
    }

    public function setOperator(string $operator):void{
        $this->operator = new Operator($operator, $this);
    }
}