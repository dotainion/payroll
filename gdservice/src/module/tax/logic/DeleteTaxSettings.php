<?php
namespace src\module\tax\logic;

use src\infrastructure\Id;
use src\module\tax\repository\TaxSettingsRepository;

class DeleteTaxSettings{
    protected TaxSettingsRepository $repo;

    public function __construct(){
        $this->repo = new TaxSettingsRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteTaxSetting($id);
    }
}