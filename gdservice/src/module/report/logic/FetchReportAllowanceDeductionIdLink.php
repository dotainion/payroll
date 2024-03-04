<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\AllowanceDeductionIdLinkRepository;

class FetchReportAllowanceDeductionIdLink{
    protected AllowanceDeductionIdLinkRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceDeductionIdLinkRepository();
    }

    public function reportOption(Id $reportLinkId):Collector{
        return $this->repo->listOptions([
            'reportLinkId' => $reportLinkId
        ]);
    }

    public function reportOptionByReportLinkIdArray(Array $reportLinkId):Collector{
        if(empty($reportLinkId)){
            return new Collector();
        }
        return $this->repo->listOptions([
            'reportLinkId' => $reportLinkId
        ]);
    }
}