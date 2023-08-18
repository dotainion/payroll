<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\factory\AllowanceFactory;
use src\module\report\objects\Allowance;

class AllowanceRepository extends Repository{
    protected AllowanceFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new AllowanceFactory();
    }

    public function create(Allowance $allowance):void{
        $this->insert('reportAllowance')        
            ->add('rAId', $this->uuid($allowance->id()))
            ->add('rAName', $allowance->name())
            ->add('rADate', $allowance->date())
            ->add('rAType', $allowance->type())
            ->add('rARate', $allowance->rate())
            ->add('rAHide', (int)$allowance->hide())
            ->add('rAReportId', $this->uuid($allowance->reportId()))
            ->add('rAAmount', $allowance->amount())
            ->add('rARateAmount', $allowance->rateAmount())
            ->add('rATotalAmount', $allowance->totalAmount());
        $this->execute();
    }
    
    public function edit(Allowance $allowance):void{
        $this->update('reportAllowance')        
            ->set('rAName', $allowance->name())
            //->set('rADate', $allowance->date())
            ->set('rAType', $allowance->type())
            ->set('rARate', $allowance->rate())
            ->set('rAHide', (int)$allowance->hide())
            ->set('rAReportId', $this->uuid($allowance->reportId()))
            ->set('rAAmount', $allowance->amount())
            ->set('rARateAmount', $allowance->rateAmount())
            ->set('rATotalAmount', $allowance->totalAmount())
            ->where('rAId', $this->uuid($allowance->id()));
        $this->execute();
    }
    
    public function deleteAllowance(Id $id):void{
        $this->update('reportAllowance')
            ->set('rAHide', 1)
            ->where('rAId', $this->uuid($id));
        $this->execute();
    }
    
    public function listAllowances(array $where=[]):Collector{
        $this->select('reportAllowance');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('rADate', $where['from'], $where['to']);
        }
        if(isset($where['reportId'])){
            $this->where('rAReportId', $this->uuid($where['reportId']));
        }
        if(isset($where['id'])){
            $this->where('rAId', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where('rAName', $where['name']);
        }
        if(isset($where['hide'])){
            $this->where('rAHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}