<?php
namespace src\module\report\logic;

use src\infrastructure\Id;
use src\module\report\repository\TaxRepository;

class DeleteReportTaxDeduction{
    protected TaxRepository $repo;

    public function __construct(){
        $this->repo = new TaxRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteTaxDedution($id);
    }
}