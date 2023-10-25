<?php
namespace src\module\tax\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\tax\objects\TaxSettings;

class TaxSettingsFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):TaxSettings{
        $tax = new TaxSettings();
        $tax->setId($this->uuid($record['id']));
        $tax->setActive((bool)$record['active']);
        $tax->setPercentage($record['percentage']);
        $tax->setLimitAmount($record['limitAmount']);
        $tax->setAlert($record['alert']);
        return $tax;
    }
}