<?php
namespace src\module\login\logic;

use src\module\notification\objects\Notification;
use src\module\notification\repository\NotificationRepository;

class SetUserNotificationSetting{
    protected NotificationRepository $repo;

    public function __construct(){
        $this->repo = new NotificationRepository();
    }

    public function set(Notification $notification):void{
        $collector = $this->repo->listNotification(['id' => $notification->id()]);
        if($collector->hasItem()){
            $this->repo->edit($notification);
        }else{
            $this->repo->create($notification);
        }
    }
}