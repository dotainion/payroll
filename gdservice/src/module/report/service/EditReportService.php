<?php
namespace src\module\report\service;

use src\infrastructure\Service;

class EditReportService extends Service{
    protected SetReportService $report;

    public function __construct(){
        parent::__construct();
        $this->report = new SetReportService();
    }
    
    public function process(
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
        $prorate,
        $notified,
        $approved = true
    ){
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
            $prorate,
            $notified,
            $approved
        );

        $this->mergeOutput($service);
        return $this;
    }
}