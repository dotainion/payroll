<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\LoanDeduction;

class LoanDeductionFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):LoanDeduction{
        $loan = new LoanDeduction();
        $loan->setId($this->uuid($record['rLDId'] ?? $record['id']));
        $loan->setUserId($this->uuid($record['userId']));
        $loan->setName($record['rLDName'] ?? $record['name']);
        $loan->setDate($record['rLDDate'] ?? $record['date']);
        $loan->setHide($record['rLDHide'] ?? $record['hide']);
        $loan->setNumber($record['rLDNumber'] ?? $record['number']);
        $loan->setAmount($record['rLDAmount'] ?? $record['amount']);
        $loan->setReportId($this->uuid($record['rLDReportId'] ?? $record['reportId']));
        return $loan;
    }
}
