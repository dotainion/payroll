<?php
namespace src\module\settings\objects;

use src\infrastructure\Id;
use src\infrastructure\IObjects;

class Operan implements IObjects{
    protected string $value;
    protected bool $isSalary = false;
    protected bool $isCalendar = false;
    protected bool $isNumber = false;
    protected Overtime $overtime;
    protected bool $isValid = true;

    public function __construct(string $value, Overtime &$overtime){
        $this->value = $value;
        if($value === 'salary'){
            $this->isSalary = true;
        }else if($value === 'calendar'){
            $this->isCalendar = true;
        }else if(is_numeric($value)){
            $this->isNumber = true;
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

    public function isSalary():bool{
        return $this->isSalary;
    }

    public function isCalendar():bool{
        return $this->isCalendar;
    }

    public function isNumber():bool{
        return $this->isNumber;
    }
}