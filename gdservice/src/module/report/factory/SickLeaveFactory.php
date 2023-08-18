<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\Allowance;
use src\module\report\objects\SickLeave;

class SickLeaveFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):SickLeave{
        $sick = new SickLeave();
        $sick->setId($this->uuid($record['sLId'] ?? $record['id']));
        $sick->setUserId($this->uuid($record['userId']));
        $sick->setReportId($this->uuid($record['sLReportId'] ?? $record['reportId']));
        $sick->setFileId($this->uuid($record['sLFileId'] ?? $record['fileId']));
        $sick->setName($record['sLName'] ?? $record['name']);
        $sick->setDate($record['sLDate'] ?? $record['date']);
        $sick->setFrom($record['sLFrom'] ?? $record['from']);
        $sick->setTo($record['sLTo'] ?? $record['to']);
        $sick->setHide($record['sLHide'] ?? $record['hide']);
        $sick->setAmount($record['sLAmount'] ?? $record['amount']);
        return $sick;
    }
}