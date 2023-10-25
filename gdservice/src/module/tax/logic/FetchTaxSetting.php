<?php
namespace src\module\tax\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\tax\repository\TaxSettingsRepository;

class FetchTaxSetting{
    protected TaxSettingsRepository $repo;

    public function __construct(){
        $this->repo = new TaxSettingsRepository();
    }

    public function fetch(Id $id):Collector{
        return $this->repo->listTaxSettings([
            'id' => $id
        ]);
    }
}