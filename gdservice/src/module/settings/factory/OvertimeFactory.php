<?php
namespace src\module\settings\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\settings\objects\Overtime;

class OvertimeFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Overtime{
        $overtime = new Overtime();
        $overtime->setId($this->uuid($record['id']));
        $overtime->setName((string)$record['name']);
        $overtime->setActive((bool)$record['active']);
        $overtime->setOperator((string)$record['operator']);
        $overtime->setPrefix((string)$record['prefix']);
        $overtime->setSuffix((string)$record['suffix']);
        return $overtime;
    }
}