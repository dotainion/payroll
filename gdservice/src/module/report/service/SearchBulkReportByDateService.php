<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Service;
use src\module\report\logic\ListEachUserReport;
use src\module\user\logic\ListUsers;

class SearchBulkReportByDateService extends Service{
    protected ListEachUserReport $report;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct();
        $this->report = new ListEachUserReport();
        $this->users = new ListUsers();
    }
    
    public function process($from, $to){
        Assert::validDate($from, 'Invalid date format');
        Assert::validDate($to, 'Invalid date format');

        $dateFrom = new DateHelper();
        $dateFrom->set($from);
        $dateTo = new DateHelper();
        $dateTo->set($to);

        $users = $this->users->users();
        $collector = $this->report->searchEachReports($users, $dateFrom, $dateTo);
        (new ReportDependenciesService())->process($collector);

        $this->setOutput($collector);
        return $this;
    }
}