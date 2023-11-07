<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\Tax;

class TaxFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Tax{
        $tax = new Tax();
        $tax->setId($this->uuid($record['taxDId'] ?? $record['id']));
        $tax->setUserId($this->uuid($record['userId']));
        $tax->setReportId($this->uuid($record['taxDReportId'] ?? $record['reportId']));
        $tax->setName($record['taxDName'] ?? $record['name']);
        $tax->setAmount($record['taxDAmount'] ?? $record['amount']);
        $tax->setNumber($record['taxId'] ?? null);
        $tax->setDate($record['taxDDate'] ?? $record['date']);
        $tax->setHide($record['taxDHide'] ?? $record['hide']);
        return $tax;
    }
}