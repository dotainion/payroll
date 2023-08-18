<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\NoPayLeaveDeduction;

class NoPayLeaveDeductionFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):NoPayLeaveDeduction{
        $leave = new NoPayLeaveDeduction();
        $leave->setId($this->uuid($record['nPLDId'] ?? $record['id']));
        $leave->setUserId($this->uuid($record['userId']));
        $leave->setReportId($this->uuid($record['nPLDReportId'] ?? $record['reportId']));
        $leave->setFileId($this->uuid($record['nPLDFileId'] ?? $record['fileId']));
        $leave->setName($record['nPLDName'] ?? $record['name']);
        $leave->setDate($record['nPLDDate'] ?? $record['date']);
        $leave->setFrom($record['nPLDFrom'] ?? $record['from']);
        $leave->setTo($record['nPLDTo'] ?? $record['to']);
        $leave->setHide($record['nPLDHide'] ?? $record['hide']);
        $leave->setAmount($record['nPLDAmount'] ?? $record['amount']);
        return $leave;
    }
}