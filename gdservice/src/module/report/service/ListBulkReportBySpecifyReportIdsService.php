<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\ListEachUserReport;
use src\module\user\logic\ListUsers;

class ListBulkReportBySpecifyReportIdsService extends Service{
    protected ListEachUserReport $report;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct();
        $this->report = new ListEachUserReport();
        $this->users = new ListUsers();
    }
    
    public function process($reportIdArray){
        Assert::arrayNotEmpty($reportIdArray, 'Must selected at lease one user');

        $idArray = [];
        foreach($reportIdArray as $id){
            Assert::validUuid($id, 'On or more user not found.');
            $idArray[] = (new Id())->set($id);
        }

        $collector = $this->report->eachByReportIdArray($idArray);
        (new ReportDependenciesService())->process($collector);

        $this->setOutput($collector);
        return $this;
    }
}