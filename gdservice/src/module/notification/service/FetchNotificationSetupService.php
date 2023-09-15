<?php
namespace src\module\notification\service;

use src\infrastructure\Service;
use src\module\login\logic\FetchNotificationSetup;

class FetchNotificationSetupService extends Service{
    protected FetchNotificationSetup $fetch;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchNotificationSetup();
    }
    
    public function process(){
        $collector = $this->fetch->fetchSetup();
        if($collector->hasItem()){
            $collector->first()->unSetPassword();
        }
        $this->setOutput($collector);
        return $this;
    }
}