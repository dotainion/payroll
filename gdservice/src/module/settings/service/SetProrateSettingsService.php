<?php
namespace src\module\settings\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\settings\factory\ProrateSettingsFactory;
use src\module\settings\logic\SetProrateSettings;

class SetProrateSettingsService extends Service{
    protected ProrateSettingsFactory $factory;
    protected SetProrateSettings $set;

    public function __construct(){
        parent::__construct();
        $this->factory = new ProrateSettingsFactory();
        $this->set = new SetProrateSettings();
    }
    
    public function process($id, $biMonthly, $off){
        $idObj = new Id();
        $idObj->isValid($id??'') ? $idObj->set($id) : $idObj->new();

        $prorate = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'biMonthly' => $biMonthly,
            'off' => $off
        ]);

        $this->set->prorate($prorate);

        $this->setOutput($prorate);
        return $this;
    }
}