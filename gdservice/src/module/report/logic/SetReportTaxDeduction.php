<?php
namespace src\module\report\logic;

use src\module\report\objects\Tax;
use src\module\report\repository\TaxRepository;

class SetReportTaxDeduction{
    protected TaxRepository $repo;
    protected FetchTaxDeductionReport $fetch;

    public function __construct(){
        $this->repo = new TaxRepository();
        $this->fetch = new FetchTaxDeductionReport();
    }

    public function create(Tax $tax):void{
        $this->repo->create($tax);
    }

    public function edit(Tax $tax):void{
        $collector = $this->fetch->taxDeductionByReportId($tax->reportId());
        if($collector->hasItem()){
            $tax->setId($collector->first()->id()->toString());
            $this->repo->edit($tax);
        }else{
            $this->create($tax);
        }
    }
}