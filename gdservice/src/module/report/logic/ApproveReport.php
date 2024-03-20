<?php
namespace src\module\report\logic;

use src\module\report\repository\ReportRepository;

class ApproveReport{
    protected ReportRepository $repo;

    public function __construct(){
        $this->repo = new ReportRepository();
    }

    public function approve(array $reportId):void{
        if(empty($reportId)){
            return;
        }
        $this->repo->approveReport($reportId);
    }
}