<?php
namespace src\module\tax\logic;

use src\infrastructure\Collector;
use src\module\tax\repository\TaxSettingsRepository;

class ListTaxSettings{
    protected TaxSettingsRepository $repo;

    public function __construct(){
        $this->repo = new TaxSettingsRepository();
    }

    public function list():Collector{
        return $this->repo->listTaxSettings([]);
    }

    public function listActive():Collector{
        return $this->repo->listTaxSettings([
            'active' => true
        ]);
    }
}