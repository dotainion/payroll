<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\Allowance;

class AllowanceFactory extends Collector{
    use Factory;
    use AllowanceDeductionFactoryTrait;

    public function __construct(){
    }

    public function mapResult($record):Allowance{
        $allowance = new Allowance();
        $allowance->setId($this->uuid($record['rAId'] ?? $record['id']));
        $allowance->setName($record['rAName'] ?? $record['name']);
        $allowance->setType($record['rAType'] ?? $record['type']);
        $allowance->setRate($record['rARate'] ?? $record['rate']);
        $allowance->setDate($record['rADate'] ?? $record['date']);
        $allowance->setHide($record['rAHide'] ?? $record['hide']);
        $allowance->setReportId($this->uuid($record['rAReportId'] ?? $record['reportId']));
        $allowance->setAmount($record['rAAmount'] ?? $record['amount']);
        $allowance->setRateAmount($record['rARateAmount'] ?? $record['rateAmount']);
        $allowance->setTotalAmount($record['rATotalAmount'] ?? $record['totalAmount']);
        $allowance->setTaxExemption($record['rATaxExemption'] ?? $record['taxExemption']);
        if(isset($record['cmd']) && isset($record['linkId'])){
            $attribute = $this->getAllowDeducAttribute($record['cmd']);
            $attribute && $allowance->setNumber($record[$attribute]);
            $attribute && $allowance->setLinkId($this->uuid($record['linkId']));
        }
        return $allowance;
    }
}