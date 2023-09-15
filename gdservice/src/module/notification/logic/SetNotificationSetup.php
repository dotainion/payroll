<?php
namespace src\module\login\logic;

use src\module\notification\objects\NotificationSetup;
use src\module\notification\repository\NotificationSetupRepository;

class SetNotificationSetup{
    protected NotificationSetupRepository $repo;

    public function __construct(){
        $this->repo = new NotificationSetupRepository();
    }

    public function set(NotificationSetup $notification):void{
        $collector = $this->repo->listNotificationSetup(['id' => $notification->id()]);
        if($collector->hasItem()){
            $this->repo->edit($notification);
        }else{
            $this->repo->create($notification);
        }
    }
}