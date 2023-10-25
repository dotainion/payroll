<?php
namespace src\module\report\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\objects\Tax;
use src\module\report\repository\TaxRepository;

class SetReportTaxDeduction{
    protected TaxRepository $repo;

    public function __construct(){
        $this->repo = new TaxRepository();
    }

    private function _assertAllowanceExist(Id $reportId):Collector{
        $collector = $this->repo->listTaxDedution(['reportId' => $reportId, 'hide' => false]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Tax deduction not found.');
        }
        return $collector;
    }

    public function create(Tax $tax):void{
        $this->repo->create($tax);
    }

    public function edit(Tax $tax):void{
        $collector = $this->_assertAllowanceExist($tax->reportId());
        $tax->setId($collector->first()->id()->toString());
        $this->repo->edit($tax);
    }
}