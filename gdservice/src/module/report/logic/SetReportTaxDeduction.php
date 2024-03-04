<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\module\report\repository\TaxRepository;

class SetReportTaxDeduction{
    protected TaxRepository $repo;
    protected FetchTaxDeductionReport $fetch;

    public function __construct(){
        $this->repo = new TaxRepository();
        $this->fetch = new FetchTaxDeductionReport();
    }

    public function create(Collector $collector):void{
        foreach($collector->list() as $tax){
            $this->repo->create($tax);
        }
    }

    public function edit(Collector $collector):void{
        foreach($collector->list() as $tax){
            $collector = $this->fetch->taxDeductionByReportId($tax->reportId());
            if($collector->hasItem()){
                $tax->setId($collector->first()->id()->toString());
                $this->repo->edit($tax);
            }else{
                $this->repo->create($tax);
            }
        }
    }
}