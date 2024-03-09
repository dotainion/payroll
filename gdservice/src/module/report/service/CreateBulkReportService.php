<?php
namespace src\module\report\service;

use src\infrastructure\GlobalData;
use src\infrastructure\Service;

class CreateBulkReportService extends Service{
    protected bool $stopExecution = true;

    public function __construct(){
        parent::__construct();
    }
    
    public function process($reports){
        GlobalData::set('createBunkNotify', 'on');
        foreach($reports??[] as $report){
            $createReport = new CreateReportService();
            $createReport->stopExecution($this->stopExecution);
            $createReport->process(
                $report['id'],
                $report['allowance'],
                $report['deduction'],
                $report['loanAllowances'],
                $report['loanDeductions'],
                $report['sickLeaves'],
                $report['overtime'],
                $report['noPayLeaveAllowances'],
                $report['noPayLeaveDeductions'],
                $report['period'],
                $report['notified']
            );
        }
        if($this->stopExecution){
            $this->stopExecution = false;
            $this->process($reports);
        }
        $service = (new ListBulkReportService())->process();
        $this->mergeOutput($service);
        return $this;
    }
}