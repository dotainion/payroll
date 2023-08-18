<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\factory\NoPayLeaveAllowanceFactory;
use src\module\report\objects\NoPayLeaveAllowance;

class NoPayLeaveAllowanceRepository extends Repository{
    protected NoPayLeaveAllowanceFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new NoPayLeaveAllowanceFactory();
    }
    
    public function create(NoPayLeaveAllowance $leave):void{
        $this->insert('reportNoPayLeaveAllowance')        
            ->add('nPLAId', $this->uuid($leave->id()))
            ->add('userId', $this->uuid($leave->userId()))
            ->add('nPLAName', $leave->name())
            ->add('nPLADate', $leave->date())
            ->add('nPLAFrom', $leave->from())
            ->add('nPLATo', $leave->to())
            ->add('nPLAHide', (int)$leave->hide())
            ->add('nPLAFileId', $this->uuid($leave->fileId()))
            ->add('nPLAAmount', $leave->amount())
            ->add('nPLAReportId', $this->uuid($leave->reportId()));
        $this->execute();
    }
    
    public function edit(NoPayLeaveAllowance $leave):void{
        $this->update('reportNoPayLeaveAllowance')       
            ->set('userId', $this->uuid($leave->userId()))
            ->set('nPLAName', $leave->name())
            ->set('nPLAHide', (int)$leave->hide())
            //->set('nPLADate', $leave->date())
            ->set('nPLAFrom', $leave->from())
            ->set('nPLATo', $leave->to())
            ->set('nPLAFileId', $this->uuid($leave->fileId()))
            ->set('nPLAAmount', $leave->amount())
            ->set('nPLAReportId', $this->uuid($leave->reportId()))
            ->where('nPLAId', $this->uuid($leave->id()));
        $this->execute();
    }
    
    public function deleteNopayLeave(Id $id):void{
        $this->update('reportNoPayLeaveAllowance')
            ->set('nPLAHide', 1)
            ->where('nPLAId', $this->uuid($id));
        $this->execute();
    }
    
    public function listNopayLeave(array $where=[]):Collector{
        $this->select('reportNoPayLeaveAllowance');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('nPLADate', $where['from'], $where['to']);
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        if(isset($where['reportId'])){
            $this->where('nPLAReportId', $this->uuid($where['reportId']));
        }
        if(isset($where['id'])){
            $this->where('nPLAId', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where('nPLAName', $where['name']);
        }
        if(isset($where['hide'])){
            $this->where('nPLAHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}