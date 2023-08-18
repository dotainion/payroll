<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\Report;
use Stringable;

class ReportFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Report{
        $report = new Report();
        $report->setId($this->uuid($record['reportId'] ?? $record['id']));
        $report->setUserId($this->uuid($record['userId']));
        $report->setDate($record['date']);
        $report->setTotalDeduction($record['totalDeduction'] ?? $record['deduction']);
        $report->setTotalAllowance($record['totalAllowance'] ?? $record['allowance']);
        $report->setTotalSalary($record['totalSalary'] ?? $record['salary']);
        $report->setNetSalary((string)($record['netSalary'] ?? $record['net']));
        $report->setHide($record['hide']);
        return $report;
    }
}