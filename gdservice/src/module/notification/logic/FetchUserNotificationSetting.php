<?php
namespace src\module\login\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\notification\repository\NotificationRepository;

class FetchUserNotificationSetting{
    protected NotificationRepository $repo;

    public function __construct(){
        $this->repo = new NotificationRepository();
    }

    public function fetchNotifiction(Id $userId):Collector{
        return $this->repo->listNotification([
            'userId' => $userId
        ]);
    }
}