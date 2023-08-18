<?php
namespace src\module\report\service;

use src\infrastructure\Service;
use src\module\report\logic\ListEachUserReport;
use src\module\user\logic\ListUsers;

class ListBulkReportService extends Service{
    protected ListEachUserReport $report;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct();
        $this->report = new ListEachUserReport();
        $this->users = new ListUsers();
    }
    
    public function process(){
        $users = $this->users->users();
        $collector = $this->report->eachReports($users);
        (new ReportDependenciesService())->process($collector);

        $this->setOutput($collector);
        return $this;
    }
}