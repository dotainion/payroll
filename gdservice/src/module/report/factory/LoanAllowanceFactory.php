<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\LoanAllowance;

class LoanAllowanceFactory extends Collector{
    use Factory;

    public function __construct(){
    }
    
    public function mapResult($record):LoanAllowance{
        $loan = new LoanAllowance();
        $loan->setId($this->uuid($record['rLAId'] ?? $record['id']));
        $loan->setUserId($this->uuid($record['userId']));
        $loan->setName($record['rLAName'] ?? $record['name']);
        $loan->setDate($record['rLADate'] ?? $record['date']);
        $loan->setHide((bool)$record['rLAHide'] ?? $record['hide']);
        $loan->setNumber($record['rLANumber'] ?? $record['number']);
        $loan->setAmount($record['rLAAmount'] ?? $record['amount']);
        $loan->setReportId($this->uuid($record['rLAReportId'] ?? $record['reportId']));
        return $loan;
    }
}
