<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\factory\OvertimeFactory;
use src\module\report\objects\Overtime;

class OvertimeRepository extends Repository{
    protected OvertimeFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new OvertimeFactory();
    }

    public function create(Overtime $overtime):void{
        $this->insert('reportOvertime')
            ->add('otId', $this->uuid($overtime->id()))
            ->add('userId', $this->uuid($overtime->userId()))
            ->add('otReportId', $this->uuid($overtime->reportId()))
            ->add('otFormularId', $this->uuid($overtime->formularId()))
            ->add('otName', $overtime->name())
            ->add('otHours', $overtime->hours())
            ->add('otAmount', $overtime->amount())
            ->add('otDate', $overtime->date())
            ->add('otHide', (int)$overtime->hide());
        $this->execute();
    }
    
    public function edit(Overtime $overtime):void{
        $this->update('reportOvertime')
            ->set('userId', $this->uuid($overtime->userId()))
            ->set('otReportId', $this->uuid($overtime->reportId()))
            ->add('otFormularId', $this->uuid($overtime->formularId()))
            ->set('otName', $overtime->name())
            ->set('otHours', $overtime->hours())
            ->set('otAmount', $overtime->amount())
            //->set('otDate', $overtime->date())
            ->set('otHide', $overtime->hide())
            ->where('otId', $this->uuid($overtime->id()));
        $this->execute();
    }
    
    public function deleteOvertime(Id $id):void{
        $this->update('reportOvertime')
            ->set('otHide', 1)
            ->where('rAId', $this->uuid($id));
        $this->execute();
    }
    
    public function listOvertime(array $where=[]):Collector{
        $this->select('reportOvertime');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('otDate', $where['from'], $where['to']);
        }
        if(isset($where['reportId'])){
            $this->where('otReportId', $this->uuid($where['reportId']));
        }
        if(isset($where['id'])){
            $this->where('otId', $this->uuid($where['id']));
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        if(isset($where['name'])){
            $this->where('otName', $where['name']);
        }
        if(isset($where['hide'])){
            $this->where('otHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}