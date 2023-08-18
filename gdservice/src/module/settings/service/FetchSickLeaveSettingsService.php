<?php
namespace src\module\settings\service;

use src\infrastructure\Service;
use src\module\settings\logic\FetchSickLeave;

class FetchSickLeaveSettingsService extends Service{
    protected FetchSickLeave $fetch;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchSickLeave();
    }
    
    public function process(){
        $collector = $this->fetch->fetchSickLeave();
        $this->setOutput($collector);
        return $this;
    }
}