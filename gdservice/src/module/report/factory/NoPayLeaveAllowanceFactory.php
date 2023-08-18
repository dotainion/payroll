<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\NoPayLeaveAllowance;

class NoPayLeaveAllowanceFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):NoPayLeaveAllowance{
        $leave = new NoPayLeaveAllowance();
        $leave->setId($this->uuid($record['nPLAId'] ?? $record['id']));
        $leave->setUserId($this->uuid($record['userId']));
        $leave->setReportId($this->uuid($record['nPLAReportId'] ?? $record['reportId']));
        $leave->setFileId($this->uuid($record['nPLAFileId'] ?? $record['fileId']));
        $leave->setName($record['nPLAName'] ?? $record['name']);
        $leave->setDate($record['nPLADate'] ?? $record['date']);
        $leave->setFrom($record['nPLAFrom'] ?? $record['from']);
        $leave->setTo($record['nPLATo'] ?? $record['to']);
        $leave->setHide($record['nPLAHide'] ?? $record['hide']);
        $leave->setAmount($record['nPLAAmount'] ?? $record['amount']);
        return $leave;
    }
}