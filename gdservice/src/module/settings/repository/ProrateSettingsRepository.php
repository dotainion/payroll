<?php
namespace src\module\settings\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\settings\factory\ProrateSettingsFactory;
use src\module\settings\objects\ProrateSettings;

class ProrateSettingsRepository extends Repository{
    protected ProrateSettingsFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ProrateSettingsFactory();
    }
    
    public function create(ProrateSettings $prorate):void{
        $this->insert('prorateSettings')
            ->add('id', $this->uuid($prorate->id()))
            ->add('biMonthly', (int)$prorate->biMonthly());
            $this->execute();
    }
    
    public function edit(ProrateSettings $prorate):void{
        $this->update('prorateSettings')
            ->set('biMonthly', (int)$prorate->biMonthly())
            ->where('id', $this->uuid($prorate->id()));
        $this->execute();
    }
    
    public function listProrateSettings(array $where=[]):Collector{
        $this->select('prorateSettings');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}