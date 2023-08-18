<?php
namespace src\module\settings\objects;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class SickLeave implements IObjects{
    protected Id $id;
    protected bool $includeSalary;
    protected ?string $percentageOfSalary;
    protected array $excludedDays = [];
    protected array $includeAllowances = [];
    protected array $includeDeductions = [];

    public function __construct(){
        $this->id = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function includeSalary():bool{
        return $this->includeSalary;
    }
    
    public function percentageOfSalary():string{
        return $this->percentageOfSalary;
    }

    public function includeAllowances():array{
        return $this->includeAllowances;
    }

    public function includeDeductions():array{
        return $this->includeDeductions;
    }

    public function excludedDays():array{
        return $this->excludedDays;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }
    
    public function setIncludeSalary(bool $includeSalary):void{
        $this->includeSalary = $includeSalary;
    }

    public function setPercentageOfSalary(string $percentageOfSalary):void{
        $this->percentageOfSalary = $percentageOfSalary;
    }

    public function setExcludedDays(string $excludedDays):void{
        Assert::stringNotEmpty($excludedDays);
        $this->excludedDays = $excludedDays;
    }

    public function setIncludeAllowances(string $allowancesId):void{
        Assert::validUuid($allowancesId, 'Allowance not found.');
        $this->includeAllowances[] = $allowancesId;
    }

    public function setIncludeDeductions(string $deductionsId):void{
        Assert::validUuid($deductionsId, 'Deduction not found.');
        $this->includeDeductions[] = $deductionsId;
    }
}