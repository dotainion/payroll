<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\Overtime;

class OvertimeFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Overtime{
        $overtime = new Overtime();
        $overtime->setId($this->uuid($record['otId'] ?? $record['id']));
        $overtime->setUserId($this->uuid($record['userId']));
        $overtime->setReportId($this->uuid($record['otReportId'] ?? $record['reportId']));
        $overtime->setFormularId($this->uuid($record['otFormularId'] ?? $record['formularId']));
        $overtime->setName($record['otName'] ?? $record['name']);
        $overtime->setHours($record['otHours'] ?? $record['hours']);
        $overtime->setAmount((string)($record['otAmount'] ?? $record['amount']));
        $overtime->setDate($record['otDate'] ?? $record['date']);
        $overtime->setHide($record['otHide'] ?? $record['hide']);
        return $overtime;
    }
}