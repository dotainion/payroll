<?php
namespace src\module\report\service;

use InvalidArgumentException;
use src\infrastructure\Id;
use src\infrastructure\Service;

class CreateReportService extends Service{
    protected SetReportService $report;

    public function __construct(){
        parent::__construct();
        $this->report = new SetReportService();
    }

    public function stopExecution($stopExecution):void{
        $this->report->stopExecution($stopExecution);
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
        $notified,
        $approved = true
    ){
        $reportId = (new Id())->new()->toString();

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
            $notified,
            $approved
        );

        $this->mergeOutput($service);
        return $this;
    }
}
