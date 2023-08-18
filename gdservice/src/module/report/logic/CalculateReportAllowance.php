<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\documents\CostTypes;
use src\infrastructure\Id;
use src\module\report\factory\AllowanceFactory;

class CalculateReportAllowance{
    protected float $totalAllowance = 0;
    protected AllowanceFactory $factory;

    public function __construct(){
        $this->factory = new AllowanceFactory();
    }

    public function calculateWidthClone(Collector $allowanceCollector, float $salary, Id $reportId):self{
        foreach($allowanceCollector->list() as $allowance){
            $totalAllowance = 0;
            if($allowance->type() === CostTypes::PERCENTAGE){
                $percentageAmount = ($salary / 100) * ((float)$allowance->amount());
                $totalAllowance = $totalAllowance + $percentageAmount;
            }
            if($allowance->type() === CostTypes::DOLLARAMOUNT){
                $totalAllowance = $totalAllowance + ((float)$allowance->amount());
            }
            if($allowance->type() === CostTypes::RATE){
                $dollarAmount = (((float)$allowance->rateAmount()) * ((float)$allowance->amount()));
                $totalAllowance = $totalAllowance + $dollarAmount;
            }
            $reportAllowance = $this->factory->mapResult([
                'id' => $allowance->id()->toString(),
                'name' => $allowance->name(),
                'type' => $allowance->type(),
                'rate' => $allowance->rate(),
                'hide' => false,
                'date' => (new DateHelper())->new()->toString(),
                'reportId' => $reportId->toString(),
                'amount' => $allowance->amount(),
                'rateAmount' => $allowance->rateAmount(),
                'totalAmount' => $totalAllowance
            ]);
            $this->totalAllowance = $this->totalAllowance + $totalAllowance;
            $this->factory->add($reportAllowance);
        }
        return $this;
    }

    public function totalAllowance():float{
        return $this->totalAllowance;
    }

    public function reportAllowances():Collector{
        return $this->factory;
    }
}