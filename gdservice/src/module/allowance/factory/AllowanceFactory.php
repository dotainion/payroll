<?php
namespace src\module\allowance\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\allowance\objects\Allowance;

class AllowanceFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Allowance{
        $allowance = new Allowance();
        $allowance->setId($this->uuid($record['aId'] ?? $record['id']));
        $allowance->setName($record['aName'] ?? $record['name']);
        $allowance->setType($record['aType'] ?? $record['type']);
        $allowance->setRate($record['aRate'] ?? $record['rate']);
        $allowance->setHide($record['aHide'] ?? $record['hide']);
        $allowance->setAmount($record['aAmount'] ?? $record['amount']);
        $allowance->setRateAmount($record['aRateAmount'] ?? $record['rateAmount']);
        $allowance->setTaxExemption($record['aTaxExemption'] ?? $record['taxExemption']);
        return $allowance;
    }
}