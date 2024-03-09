<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\ListUserReport;
use src\module\user\logic\FetchUser;

class SearchReportByDateAndUserIdService extends Service{
    protected ListUserReport $report;
    protected FetchUser $user;

    public function __construct(){
        parent::__construct();
        $this->report = new ListUserReport();
        $this->user = new FetchUser();
    }
    
    public function process($from, $to, $id){
        Assert::validUuid($id, 'User not found.');
        Assert::validDate($from, 'Invalid date format');
        Assert::validDate($to, 'Invalid date format');

        $userId = new Id();
        $userId->set($id);
        $dateFrom = new DateHelper();
        $dateFrom->set($from);
        $dateTo = new DateHelper();
        $dateTo->set($to);

        $user = $this->user->user($userId);
        $collector = $this->report->reportsByDateRange($userId, $dateFrom, $dateTo);
        foreach($collector->list() as $report){
            $report->setUser($user->first());
        }
        (new ReportDependenciesService())->process($collector);

        $this->setOutput($collector);
        return $this;
    }
}