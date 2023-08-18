<?php
namespace src\module\deduction\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\deduction\factory\DeductionFactory;
use src\module\deduction\objects\Deduction;
use src\module\user\factory\UserFactory;

class DeductionRepository extends Repository{
    protected DeductionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DeductionFactory();
    }
    
    public function create(Deduction $deduction):void{
        $this->insert('deduction')        
            ->add('dId', $this->uuid($deduction->id()))
            ->add('dName', $deduction->name())
            ->add('dRate', $deduction->rate())
            ->add('dAmount', $deduction->amount())
            ->add('dType', $deduction->type())
            ->add('dHide', (int)$deduction->hide())
            ->add('dRateAmount', $deduction->rateAmount());
        $this->execute();
    }
    
    public function edit(Deduction $deduction):void{
        $this->update('deduction')        
            ->set('dName', $deduction->name())
            ->set('dRate', $deduction->rate())
            ->set('dType', $deduction->type())
            ->set('dHide', (int)$deduction->hide())
            ->set('dAmount', $deduction->amount())
            ->set('dRateAmount', $deduction->rateAmount())
            ->where('dId', $this->uuid($deduction->id()));
        $this->execute();
    }
    
    public function deleteDeduction(Id $id):void{
        $this->update('deduction')        
            ->set('dHide', 1)
            ->where('dId', $this->uuid($id));
        $this->execute();
    }
    
    public function listDeductions(array $where=[]):Collector{
        $this->select('deduction');
        if(isset($where['hide'])){
            $this->where('dHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}