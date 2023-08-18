<?php
namespace src\module\deduction\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\deduction\objects\Deduction;

class DeductionFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Deduction{
        $deduction = new Deduction();
        $deduction->setId($this->uuid($record['dId'] ?? $record['id']));
        $deduction->setName($record['dName'] ?? $record['name']);
        $deduction->setType($record['dType'] ?? $record['type']);
        $deduction->setRate($record['dRate'] ?? $record['rate']);
        $deduction->setHide($record['dHide'] ?? $record['hide']);
        $deduction->setAmount($record['dAmount'] ?? $record['amount']);
        $deduction->setRateAmount($record['dRateAmount'] ?? $record['rateAmount']);
        return $deduction;
    }
}
