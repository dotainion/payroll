<?php
namespace src\module\settings\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\settings\objects\ProrateSettings;

class ProrateSettingsFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):ProrateSettings{
        $prorate = new ProrateSettings();
        $prorate->setId($this->uuid($record['id']));
        $prorate->setBiMonthly((bool)$record['biMonthly']);
        $prorate->setOff((bool)$record['off']);
        return $prorate;
    }
}