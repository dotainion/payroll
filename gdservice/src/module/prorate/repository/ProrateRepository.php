<?php
namespace src\module\prorate\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\prorate\factory\ProrateFactory;
use src\module\prorate\objects\Prorate;

class ProrateRepository extends Repository{
    protected ProrateFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ProrateFactory();
    }
    
    public function create(Prorate $prorate):void{
        $this->insert('prorate')
            ->add('id', $this->uuid($prorate->id()))
            ->add('reportId', $this->uuid($prorate->reportId()))
            ->add('userId', $this->uuid($prorate->userId()))
            ->add('date', $prorate->date())
            ->add('hide', (int)$prorate->hide())
            ->add('from', $prorate->from())
            ->add('to', $prorate->to());
            $this->execute();
    }
    
    public function edit(Prorate $prorate):void{
        $this->update('prorate')
            ->set('reportId', $this->uuid($prorate->reportId()))
            ->set('userId', $this->uuid($prorate->userId()))
            ->set('date', $prorate->date())
            ->set('hide', (int)$prorate->hide())
            ->set('from', $prorate->from())
            ->set('to', $prorate->to())
            ->where('id', $this->uuid($prorate->id()));
        $this->execute();
    }
    
    public function deleteProrate(Id $id):void{
        $this->update('prorate')
            ->set('hide', 1)
            ->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function listProrate(array $where=[]):Collector{
        $this->select('prorate');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['reportId'])){
            $this->where('reportId', $this->uuid($where['reportId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}