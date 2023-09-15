<?php
namespace src\module\login\logic;

use src\infrastructure\Collector;
use src\module\notification\repository\NotificationSetupRepository;

class FetchNotificationSetup{
    protected NotificationSetupRepository $repo;

    public function __construct(){
        $this->repo = new NotificationSetupRepository();
    }

    public function fetchSetup():Collector{
        return $this->repo->listNotificationSetup();
    }
}