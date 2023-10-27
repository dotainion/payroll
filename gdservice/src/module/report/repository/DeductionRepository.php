<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\factory\DeductionFactory;
use src\module\report\objects\Deduction;

class DeductionRepository extends Repository{
    protected DeductionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DeductionFactory();
    }
    
    public function create(Deduction $deduction):void{
        $this->insert('reportDeduction')
            ->add('rDId', $this->uuid($deduction->id()))
            ->add('rDName', $deduction->name())
            ->add('rDType', $deduction->type())
            ->add('rDDate', $deduction->date())
            ->add('rDRate', $deduction->rate())
            ->add('rDHide', (int)$deduction->hide())
            ->add('rDReportId', $this->uuid($deduction->reportId()))
            ->add('rDAmount', $deduction->amount())
            ->add('rDRateAmount', $deduction->rateAmount())
            ->add('rDTotalAmount', $deduction->totalAmount());
        $this->execute();
    }
    
    public function edit(Deduction $deduction):void{
        $this->update('reportDeduction')        
            ->set('rDName', $deduction->name())
            ->set('rDType', $deduction->type())
            ->set('rDRate', $deduction->rate())
            ->set('rDHide', (int)$deduction->hide())
            //->set('rDDate', $deduction->date())
            ->set('rDReportId', $this->uuid($deduction->reportId()))
            ->set('rDAmount', $deduction->amount())
            ->set('rDRateAmount', $deduction->rateAmount())
            ->set('rDTotalAmount', $deduction->totalAmount())
            ->where('rDId', $this->uuid($deduction->id()));
        $this->execute();
    }
    
    public function deleteDeduction(Id $id):void{
        $this->update('reportDeduction')
            ->set('rDHide', 1)
            ->where('rDId', $this->uuid($id));
        $this->execute();
    }
    
    public function listDeductions(array $where=[]):Collector{
        $this->select('reportDeduction')
            ->leftJoin('report', 'reportId', 'reportDeduction', 'rDReportId')
            ->leftJoin('user', 'id', 'report', 'userId')
            ->leftJoin('reportAllowanceDeductionIdLink', 'reportLinkId', 'reportDeduction', 'rDId')
            ->leftJoin('allowanceDeductionIdLink', 'linkId', 'reportAllowanceDeductionIdLink', 'linkId'); 
        if(isset($where['from']) && isset($where['to'])){
            $this->between('rDDate', $where['from'], $where['to']);
        }
        if(isset($where['id'])){
            $this->where('rDId', $this->uuid($where['id']));
        }
        if(isset($where['reportId'])){
            $this->where('rDReportId', $this->uuid($where['reportId']));
        }
        if(isset($where['name'])){
            $this->where('rDName', $where['name']);
        }
        if(isset($where['hide'])){
            $this->where('rDHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}