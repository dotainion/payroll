<?php
namespace src\module\report\service;

use src\infrastructure\Service;
use src\module\report\logic\ListEachUserReport;
use src\module\user\logic\ListUsers;

class ListPendingReportsService extends Service{
    protected ListEachUserReport $report;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct();
        $this->report = new ListEachUserReport();
        $this->users = new ListUsers();
    }
    
    public function process(){
        $collector = $this->report->pendingReports();
        (new ReportDependenciesService())->process($collector);

        $this->setOutput($collector);
        return $this;
    }
}