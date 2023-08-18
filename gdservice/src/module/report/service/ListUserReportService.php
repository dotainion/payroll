<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\ListUserReport;

class ListUserReportService extends Service{
    protected ListUserReport $report;

    public function __construct(){
        parent::__construct();
        $this->report = new ListUserReport();
    }
    
    public function process($id){
        Assert::validUuid($id, 'User not found.');

        $userId = new Id();
        $userId->set($id);
        $collector = $this->report->reports($userId);
        (new ReportDependenciesService())->process($collector);

        $this->setOutput($collector);
        return $this;
    }
}