<?php
namespace src\module\allowanceDeductionIdLink\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\allowanceDeductionIdLink\objects\AllowanceDeductionIdLink;

class AllowanceDeductionIdLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):AllowanceDeductionIdLink{
        $option = new AllowanceDeductionIdLink();
        $option->setId($this->uuid($record['linkId'] ?? $record['id']));
        $option->setCmd($record['cmd'] ?? $record['name']);
        return $option;
    }
}