<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\factory\NoPayLeaveDeductionFactory;
use src\module\report\objects\NoPayLeaveDeduction;

class NoPayLeaveDeductionRepository extends Repository{
    protected NoPayLeaveDeductionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new NoPayLeaveDeductionFactory();
    }

    public function create(NoPayLeaveDeduction $leave):void{
        $this->insert('reportNoPayLeaveDeduction')        
            ->add('nPLDId', $this->uuid($leave->id()))
            ->add('userId', $this->uuid($leave->userId()))
            ->add('nPLDName', $leave->name())
            ->add('nPLDDate', $leave->date())
            ->add('nPLDFrom', $leave->from())
            ->add('nPLDTo', $leave->to())
            ->add('nPLDHide', (int)$leave->hide())
            ->add('nPLDFileId', $this->uuid($leave->fileId()))
            ->add('nPLDAmount', $leave->amount())
            ->add('nPLDReportId', $this->uuid($leave->reportId()));
        $this->execute();
    }
    
    public function edit(NoPayLeaveDeduction $leave):void{
        $this->update('reportNoPayLeaveDeduction')       
            ->set('userId', $this->uuid($leave->userId()))
            ->set('nPLDName', $leave->name())
            ->set('nPLDHide', (int)$leave->hide())
            //->set('nPLDDate', $leave->date())
            ->set('nPLDFrom', $leave->from())
            ->set('nPLDTo', $leave->to())
            ->set('nPLDFileId', $this->uuid($leave->fileId()))
            ->set('nPLDAmount', $leave->amount())
            ->set('nPLDReportId', $this->uuid($leave->reportId()))
            ->where('nPLDId', $this->uuid($leave->id()));
        $this->execute();
    }
    
    public function deleteNopayLeave(Id $id):void{
        $this->delete('reportNoPayLeaveDeduction')
            ->set('nPLDHide', 1)
            ->where('nPLDId', $this->uuid($id));
        $this->execute();
    }
    
    public function listNopayLeave(array $where=[]):Collector{
        $this->select('reportNoPayLeaveDeduction');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('nPLDDate', $where['from'], $where['to']);
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        if(isset($where['reportId'])){
            $this->where('nPLDReportId', $this->uuid($where['reportId']));
        }
        if(isset($where['id'])){
            $this->where('nPLDId', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where('nPLDName', $where['name']);
        }
        if(isset($where['hide'])){
            $this->where('nPLDHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}