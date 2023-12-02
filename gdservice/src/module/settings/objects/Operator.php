<?php
namespace src\module\settings\objects;

use src\infrastructure\Id;
use src\infrastructure\IObjects;

class Operator implements IObjects{
    protected string $value;
    protected bool $isSubtract = false;
    protected bool $isDivide = false;
    protected bool $isMultiply = false;
    protected Overtime $overtime;
    protected bool $isValid = true;

    public function __construct(string $value, Overtime &$overtime){
        $this->value = $value;
        if($value === 'x'){
            $this->isMultiply = true;
        }else if($value === '-'){
            $this->isSubtract = true;
        }else if($value === '/'){
            $this->isDivide = true;
        }else{
            $this->isValid = false;
        }
        $this->overtime = $overtime;
    }

    public function id():Id{
        return $this->overtime->id();
    }

    public function isValid():bool{
        return $this->isValid;
    }

    public function value():string{
        return $this->value;
    }

    public function isMultiply():bool{
        return $this->isMultiply;
    }

    public function isSubtract():bool{
        return $this->isSubtract;
    }

    public function isDivide():bool{
        return $this->isDivide;
    }
}