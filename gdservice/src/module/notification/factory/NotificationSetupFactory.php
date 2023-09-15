<?php
namespace src\module\notification\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\notification\objects\NotificationSetup;

class NotificationSetupFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):NotificationSetup{
        $setup = new NotificationSetup();
        $setup->setId($this->uuid($record['id']));
        $setup->setEmail($record['email']);
        $setup->setPassword($record['password']);
        return $setup;
    }
}
