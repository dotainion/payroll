<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\allowanceDeductionIdLink\logic\FetchAllowanceDeductionIdLink;
use src\module\report\factory\AllowanceDeductionIdLinkFactory;
use src\module\report\repository\AllowanceDeductionIdLinkRepository;

class HandleAllowanceDeductionIdLinkToFactory{
    protected AllowanceDeductionIdLinkRepository $repo;
    protected FetchAllowanceDeductionIdLink $fetch;
    protected FetchReportAllowanceDeductionIdLink $fetchReport;
    protected FetchReportAllowanceDeductionIdLink $fetchExistingReport;
    protected AllowanceDeductionIdLinkFactory $factory;

    public function __construct(){
        $this->repo = new AllowanceDeductionIdLinkRepository();
        $this->fetch = new FetchAllowanceDeductionIdLink();
        $this->fetchReport = new FetchReportAllowanceDeductionIdLink();
        $this->fetchExistingReport = new FetchReportAllowanceDeductionIdLink();
        $this->factory = new AllowanceDeductionIdLinkFactory();
    }

    public function toFactory(array $allowances):self{
        foreach($allowances as $allowance){
            $linkId = new Id();

            if(!isset($allowance['linkId']) || !$linkId->isValid($allowance['linkId']??'')){
                continue;
            }
            
            $linkId->set($allowance['linkId']);

            $existingReportLinkCollector = $this->fetchExistingReport->reportOption($linkId);
            if($existingReportLinkCollector->hasItem()){
                continue;
            }

            $collector = $this->fetch->option($linkId);
            if(!$collector->hasItem()){
                continue;
            }

            $id = (new Id())->set($allowance['id']);
            $reportLinkCollector = $this->fetchReport->reportOption($id);
            if(!$reportLinkCollector->hasItem()){
                $option = $this->factory->mapResult([
                    'linkId' => $linkId,
                    'reportLinkId' => $id,
                ]);
                $this->factory->add($option);
            }
        }
        return $this;
    }

    public function optionLinks():Collector{
        return $this->factory;
    }
}