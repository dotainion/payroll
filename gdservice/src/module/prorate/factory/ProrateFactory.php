<?php
namespace src\module\prorate\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\prorate\objects\Prorate;

class ProrateFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Prorate{
        $prorate = new Prorate();
        $prorate->setId($this->uuid($record['id']));
        $prorate->setUserId($this->uuid($record['userId']));
        $prorate->setReportId($this->uuid($record['reportId']));
        $prorate->setDate($record['date']);
        $prorate->setHide((bool)$record['hide']);
        $prorate->setFrom($record['from']);
        $prorate->setTo($record['to']);
        return $prorate;
    }
}