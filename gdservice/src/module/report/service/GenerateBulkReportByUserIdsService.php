<?php
namespace src\module\report\service;

use src\infrastructure\Id;
use src\infrastructure\Service;

class GenerateBulkReportByUserIdsService extends Service{
    protected SetReportService $report;

    public function __construct(){
        parent::__construct();
        $this->report = new SetReportService();
    }
    
    public function process(array $userId, array $period){
        foreach($userId as $id){
            $service = $this->report->process(
                $id,
                (new Id())->new()->toString(),
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                $period,
                [],
                [['notify' => true]],
                false
            );
        }

        $this->mergeOutput($service);
        return $this;
    }
}