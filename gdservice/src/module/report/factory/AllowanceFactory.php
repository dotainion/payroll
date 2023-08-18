<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\Allowance;

class AllowanceFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Allowance{
        $allowance = new Allowance();
        $allowance->setId($this->uuid($record['rAId'] ?? $record['id']));
        $allowance->setName($record['rAName'] ?? $record['name']);
        $allowance->setType($record['rAType'] ?? $record['type']);
        $allowance->setRate($record['rARate'] ?? $record['rate']);
        $allowance->setDate($record['rADate'] ?? $record['date']);
        $allowance->setHide($record['rAHide'] ?? $record['hide']);
        $allowance->setReportId($this->uuid($record['rAReportId'] ?? $record['reportId']));
        $allowance->setAmount($record['rAAmount'] ?? $record['amount']);
        $allowance->setRateAmount($record['rARateAmount'] ?? $record['rateAmount']);
        $allowance->setTotalAmount($record['rATotalAmount'] ?? $record['totalAmount']);
        return $allowance;
    }
}