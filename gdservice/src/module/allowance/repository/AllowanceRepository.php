<?php
namespace src\module\allowance\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\allowance\factory\AllowanceFactory;
use src\module\allowance\objects\Allowance;

class AllowanceRepository extends Repository{
    protected AllowanceFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new AllowanceFactory();
    }
    
    public function create(Allowance $allowance):void{
        $this->insert('allowance')        
            ->add('aId', $this->uuid($allowance->id()))
            ->add('aName', $allowance->name())
            ->add('aRate', $allowance->rate())
            ->add('aType', $allowance->type())
            ->add('aHide', (int)$allowance->hide())
            ->add('aAmount', $allowance->amount())
            ->add('aRateAmount', $allowance->rateAmount())
            ->add('aTaxExemption', $allowance->taxExemption());
        $this->execute();
    }
    
    public function edit(Allowance $allowance):void{
        $this->update('allowance')        
            ->set('aName', $allowance->name())
            ->set('aRate', $allowance->rate())
            ->set('aType', $allowance->type())
            ->set('aHide', (int)$allowance->hide())
            ->set('aAmount', $allowance->amount())
            ->set('aRateAmount', $allowance->rateAmount())
            ->set('aTaxExemption', $allowance->taxExemption())
            ->where('aId', $this->uuid($allowance->id()));
        $this->execute();
    }
    
    public function deleteAllowance(Id $id):void{
        $this->update('allowance')        
            ->set('aHide', 1)
            ->where('aId', $this->uuid($id));
        $this->execute();
    }
    
    public function listAllowances(array $where=[]):Collector{
        $this->select('allowance');
        if(isset($where['hide'])){
            $this->where('aHide', (int)$where['hide']);
        }
        if(isset($where['id'])){
            $this->where('aId', $this->uuid($where['id']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}