<?php
namespace src\module\report\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\report\objects\Deduction;

class DeductionFactory extends Collector{
    use Factory;
    use AllowanceDeductionFactoryTrait;

    public function __construct(){
    }

    public function mapResult($record):Deduction{
        $deduction = new Deduction();
        $deduction->setId($this->uuid($record['rDId'] ?? $record['id']));
        $deduction->setName($record['rDName'] ?? $record['name']);
        $deduction->setType($record['rDType'] ?? $record['type']);
        $deduction->setRate($record['rDRate'] ?? $record['rate']);
        $deduction->setDate($record['rDDate'] ?? $record['date']);
        $deduction->setHide($record['rDHide'] ?? $record['hide']);
        $deduction->setReportId($this->uuid($record['rDReportId'] ?? $record['reportId']));
        $deduction->setAmount($record['rDAmount'] ?? $record['amount']);
        $deduction->setRateAmount($record['rDRateAmount'] ?? $record['rateAmount']);
        $deduction->setTotalAmount($record['rDTotalAmount'] ?? $record['totalAmount']);
        if(isset($record['cmd']) && isset($record['linkId'])){
            $attribute = $this->getAllowDeducAttribute($record['cmd']);
            $attribute && $deduction->setNumber($record[$attribute]);
            $attribute && $deduction->setLinkId($this->uuid($record['linkId']));
        }
        return $deduction;
    }
}
