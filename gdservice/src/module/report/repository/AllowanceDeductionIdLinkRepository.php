<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\factory\AllowanceDeductionIdLinkFactory;
use src\module\report\objects\Allowance;
use src\module\report\objects\AllowanceDeductionIdLink;

class AllowanceDeductionIdLinkRepository extends Repository{
    protected AllowanceDeductionIdLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new AllowanceDeductionIdLinkFactory();
    }

    public function create(AllowanceDeductionIdLink $option):void{
        $this->insert('reportAllowanceDeductionIdLink')        
            ->add('linkId', $this->uuid($option->linkId()))
            ->add('reportLinkId', $this->uuid($option->reportLinkId()));
        $this->execute();
    }
    
    public function edit(AllowanceDeductionIdLink $option):void{
        $this->update('reportAllowanceDeductionIdLink')
            ->set('linkId', $this->uuid($option->linkId()))
            ->set('reportLinkId', $this->uuid($option->reportLinkId()))
            ->where('linkId', $this->uuid($option->linkId()))
            ->where('reportLinkId', $this->uuid($option->reportLinkId()));
        $this->execute();
    }
    
    public function deleteOption(Id $reportLinkId):void{
        $this->update('reportAllowanceDeductionIdLink')
            ->where('reportLinkId', $this->uuid($reportLinkId));
        $this->execute();
    }
    
    public function listOptions(array $where=[]):Collector{
        $this->select('reportAllowanceDeductionIdLink');
        if(isset($where['linkId'])){
            $this->where('linkId', $this->uuid($where['linkId']));
        }
        if(isset($where['reportLinkId'])){
            $this->where('reportLinkId', $this->uuid($where['reportLinkId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}