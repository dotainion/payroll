<?php
namespace src\module\tax\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\tax\factory\TaxSettingsFactory;
use src\module\tax\objects\TaxSettings;

class TaxSettingsRepository extends Repository{
    protected TaxSettingsFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new TaxSettingsFactory();
    }

    public function create(TaxSettings $taxSettings):void{
        $this->insert('taxSettings')        
            ->add('id', $this->uuid($taxSettings->id()))
            ->add('active', $taxSettings->active())
            ->add('percentage', $taxSettings->percentage())
            ->add('limitAmount', $taxSettings->limitAmount())
            ->add('alert', $taxSettings->alert());
        $this->execute();
    }
    
    public function edit(TaxSettings $taxSettings):void{
        $this->update('taxSettings')
            ->set('active', $taxSettings->active())
            ->set('percentage', $taxSettings->percentage())
            ->set('limitAmount', $taxSettings->limitAmount())
            ->set('alert', $taxSettings->alert())
            ->where('id', $this->uuid($taxSettings->id()));
        $this->execute();
    }
    
    public function deleteTaxSetting(Id $id):void{
        $this->delete('taxSettings')
            ->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function listTaxSettings(array $where=[]):Collector{
        $this->select('taxSettings');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}