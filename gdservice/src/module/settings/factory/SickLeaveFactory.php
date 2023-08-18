<?php
namespace src\module\settings\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\infrastructure\Id;
use src\module\settings\objects\SickLeave;

class SickLeaveFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):SickLeave{
        $sickLeave = new SickLeave();
        $sickLeave->setId($this->uuid($record['id']));
        $sickLeave->setIncludeSalary((bool)$record['includeSalary']);
        $sickLeave->setPercentageOfSalary($record['percentageOfSalary']);
        
        foreach(explode(', ', $record['excludedDays']) ?? [] as $day){
            if(!empty($day)){
                $sickLeave->setExcludedDays($day);
            }
        }
        foreach(explode(', ', $record['includeAllowances']) ?? [] as $allowanceId){
            if((new Id())->isValid($allowanceId)){
                $sickLeave->setIncludeAllowances((new Id())->set($allowanceId)->toString());
            }
        }
        foreach(explode(', ', $record['includeDeductions']) ?? [] as $deductionId){
            if((new Id())->isValid($deductionId)){
                $sickLeave->setIncludeDeductions((new Id())->set($deductionId)->toString());
            }
        }

        return $sickLeave;
    }
}