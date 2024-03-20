<?php
namespace src\module\settings\logic;

use src\infrastructure\Collector;
use src\module\settings\repository\ProrateSettingsRepository;

class FetchProrateSettings{
    protected ProrateSettingsRepository $repo;

    public function __construct(){
        $this->repo = new ProrateSettingsRepository();
    }

    public function prorate():Collector{
        return $this->repo->listProrateSettings();
    }
}