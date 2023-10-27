<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\module\report\repository\AllowanceDeductionIdLinkRepository;

class SetReportAllowanceDeductionIdLink{
    protected AllowanceDeductionIdLinkRepository $repo;

    public function __construct(){
        $this->repo = new AllowanceDeductionIdLinkRepository();
    }

    public function setOptionLink(Collector $optionLinkCollector):void{
        foreach($optionLinkCollector->list() as $optionLink){
            $collector = $this->repo->listOptions([
                'linkId' => $optionLink->linkId(),
                'reportLinkId' => $optionLink->reportLinkId()
            ]);
            if(!$collector->hasItem()){
                $this->repo->create($optionLink);
                continue;
            }
            //$this->repo->edit($optionLink);
        }
    }
}