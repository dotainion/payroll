<?php
namespace src\module\report\service;

use src\infrastructure\Service;
use src\module\report\logic\ListEachUserReport;
use src\module\user\logic\ListUsers;

class CloneBulkReportService extends Service{
    protected ListUsers $users;
    protected ListEachUserReport $report;

    public function __construct(){
        parent::__construct();
        $this->report = new ListEachUserReport();
        $this->users = new ListUsers();
    }
    
    public function process(){
        $users = $this->users->users();
        $collector = $this->report->eachReports($users);
        $service = (new CloneReportService())->process($collector);

        $this->mergeOutput($service);
        return $this;
    }
}