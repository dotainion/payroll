<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\factory\SickLeaveFactory;
use src\module\report\objects\SickLeave;

class SickLeaveRepository extends Repository{
    protected SickLeaveFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new SickLeaveFactory();
    }

    public function create(SickLeave $sickLeave):void{
        $this->insert('reportSickLeave')        
            ->add('sLId', $this->uuid($sickLeave->id()))
            ->add('userId', $this->uuid($sickLeave->userId()))
            ->add('sLName', $sickLeave->name())
            ->add('sLDate', $sickLeave->date())
            ->add('sLFrom', $sickLeave->from())
            ->add('sLTo', $sickLeave->to())
            ->add('sLHide', (int)$sickLeave->hide())
            ->add('sLFileId', $this->uuid($sickLeave->fileId()))
            ->add('sLAmount', $sickLeave->amount())
            ->add('sLReportId', $this->uuid($sickLeave->reportId()));
        $this->execute();
    }
    
    public function edit(SickLeave $sickLeave):void{
        $this->update('reportSickLeave')       
            ->set('userId', $this->uuid($sickLeave->userId()))
            ->set('sLName', $sickLeave->name())
            ->set('sLHide', (int)$sickLeave->hide())
            //->set('sLDate', $sickLeave->date())
            ->set('sLFrom', $sickLeave->from())
            ->set('sLTo', $sickLeave->to())
            ->set('sLFileId', $this->uuid($sickLeave->fileId()))
            ->set('sLAmount', $sickLeave->amount())
            ->set('sLReportId', $this->uuid($sickLeave->reportId()))
            ->where('sLId', $this->uuid($sickLeave->id()));
        $this->execute();
    }
    
    public function deleteSickLeave(Id $id):void{
        $this->update('reportSickLeave')
            ->set('sLHide', 1)
            ->where('rAId', $this->uuid($id));
        $this->execute();
    }
    
    public function listSickLeave(array $where=[]):Collector{
        $this->select('reportSickLeave');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('sLDate', $where['from'], $where['to']);
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        if(isset($where['reportId'])){
            $this->where('sLReportId', $this->uuid($where['reportId']));
        }
        if(isset($where['id'])){
            $this->where('sLId', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where('sLName', $where['name']);
        }
        if(isset($where['hide'])){
            $this->where('sLHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}