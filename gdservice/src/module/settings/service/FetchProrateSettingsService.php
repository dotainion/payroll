<?php
namespace src\module\settings\service;

use src\infrastructure\Service;
use src\module\settings\logic\FetchProrateSettings;

class FetchProrateSettingsService extends Service{
    protected FetchProrateSettings $fetch;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchProrateSettings();
    }
    
    public function process(){
        $collector = $this->fetch->prorate();

        $this->setOutput($collector);
        return $this;
    }
}