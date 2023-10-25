<?php
namespace src\module\report\service;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;

class CalculateReportService extends Service{
    protected SetReportService $report;

    public function __construct(){
        parent::__construct();
        $this->report = new SetReportService();
    }
    
    public function process(
        $id,
        $allowance,
        $deduction,
        $loanAllowances,
        $loanDeductions,
        $sickLeaves,
        $overtime,
        $noPayLeaveAllowances,
        $noPayLeaveDeductions,
        $period,
        $notified
    ){
        $reportId = (new Id())->new()->toString();
        
        $this->report->stopExecution(true);
        $service = $this->report->process(
            $id,
            $reportId,
            $allowance,
            $deduction,
            $loanAllowances,
            $loanDeductions,
            $sickLeaves,
            $overtime,
            $noPayLeaveAllowances,
            $noPayLeaveDeductions,
            $period,
            $notified
        );

        $this->mergeOutput($service);
        return $this;
    }
}
