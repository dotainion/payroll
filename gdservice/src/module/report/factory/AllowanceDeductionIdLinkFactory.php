<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\AllowanceDeductionIdLink;

class AllowanceDeductionIdLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):AllowanceDeductionIdLink{
        $option = new AllowanceDeductionIdLink();
        $option->setLinkId($this->uuid($record['linkId']));
        $option->setReportLinkId($this->uuid($record['reportLinkId']));
        return $option;
    }
}