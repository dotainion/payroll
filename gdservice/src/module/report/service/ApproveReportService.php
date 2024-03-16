<?php
namespace src\module\report\service;

use InvalidArgumentException;
use src\infrastructure\Service;
use src\module\report\logic\ApproveReport;
use src\module\report\logic\ListEachUserReport;

class ApproveReportService extends Service{
    protected ApproveReport $report;
    protected ListEachUserReport $listReport;

    public function __construct(){
        parent::__construct();
        $this->report = new ApproveReport();
        $this->listReport = new ListEachUserReport();
    }
    
    public function process($id){
        if(!is_string($id) && !is_array($id)){
            throw new InvalidArgumentException('No report provided.');
        }
        if(is_string($id)){
            $id = [$id];
        }
        
        $this->report->approve($id);
        $collector = $this->listReport->eachByReportIdArray($id);

        $this->setOutput($collector);
        return $this;
    }
}
