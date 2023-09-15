<?php
namespace src\module\notification\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\notification\objects\Notification;

class NotificationFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Notification{
        $notification = new Notification();
        $notification->setId($this->uuid($record['id']));
        $notification->setUserId($this->uuid($record['userId']));
        $notification->setCreated((bool)$record['created']);
        $notification->setUpdated((bool)$record['updated']);
        $notification->setDeleted((bool)$record['deleted']);
        $notification->setMentioned((bool)$record['mentioned']);
        return $notification;
    }
}
