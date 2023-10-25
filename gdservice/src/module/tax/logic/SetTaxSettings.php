<?php
namespace src\module\tax\logic;

use src\module\tax\objects\TaxSettings;
use src\module\tax\repository\TaxSettingsRepository;

class SetTaxSettings{
    protected TaxSettingsRepository $repo;

    public function __construct(){
        $this->repo = new TaxSettingsRepository();
    }

    public function set(TaxSettings $taxSettings):void{
        $collector = $this->repo->listTaxSettings([
            'id' => $taxSettings->id()
        ]);
        $collector->hasItem() 
            ? $this->repo->edit($taxSettings) 
            : $this->repo->create($taxSettings);
    }
}