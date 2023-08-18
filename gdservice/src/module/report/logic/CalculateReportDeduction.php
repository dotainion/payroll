<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\documents\CostTypes;
use src\infrastructure\Id;
use src\module\report\factory\DeductionFactory;

class CalculateReportDeduction{
    protected float $totalDeduction = 0;
    protected DeductionFactory $factory;

    public function __construct(){
        $this->factory = new DeductionFactory();
    }

    public function calculateWidthClone(Collector $deductionCollector, float $salary, Id $reportId):self{
        foreach($deductionCollector->list() as $allowance){
            $totalDeduction = 0;
            if($allowance->type() === CostTypes::PERCENTAGE){
                $percentageAmount = ($salary / 100) * ((float)$allowance->amount());
                $totalDeduction = $totalDeduction + $percentageAmount;
            }
            if($allowance->type() === CostTypes::DOLLARAMOUNT){
                $totalDeduction = $totalDeduction + ((float)$allowance->amount());
            }
            if($allowance->type() === CostTypes::RATE){
                $dollarAmount = (((float)$allowance->rateAmount()) * ((float)$allowance->amount()));
                $totalDeduction = $totalDeduction + $dollarAmount;
            }
            $reportDeduction = $this->factory->mapResult([
                'id' => $allowance->id()->toString(),
                'name' => $allowance->name(),
                'type' => $allowance->type(),
                'rate' => $allowance->rate(),
                'hide' => false,
                'date' => (new DateHelper())->new()->toString(),
                'reportId' => $reportId->toString(),
                'amount' => $allowance->amount(),
                'rateAmount' => $allowance->rateAmount(),
                'totalAmount' => $totalDeduction
            ]);
            $this->totalDeduction = $this->totalDeduction + $totalDeduction;
            $this->factory->add($reportDeduction);
        }
        return $this;
    }

    public function totalDeduction():float{
        return $this->totalDeduction;
    }

    public function reportDeductions():Collector{
        return $this->factory;
    }
}