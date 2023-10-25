<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\repository\TaxRepository;

class FetchTaxDeductionReport{
    protected TaxRepository $repo;

    public function __construct(){
        $this->repo = new TaxRepository();
    }

    public function taxDeduction(Id $id):Collector{
        return $this->repo->listTaxDedution([
            'hide' => false,
            'id' => $id
        ]);
    }

    public function taxDeductionByReportId(Id $reportId):Collector{
        return $this->repo->listTaxDedution([
            'hide' => false,
            'reportId' => $reportId
        ]);
    }
}