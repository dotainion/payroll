<?php
namespace src\module\notification\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\login\logic\SetNotificationSetup;
use src\module\notification\factory\NotificationSetupFactory;

class SetNotificationSetupService extends Service{
    protected SetNotificationSetup $setup;
    protected NotificationSetupFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->setup = new SetNotificationSetup();
        $this->factory = new NotificationSetupFactory();
    }
    
    public function process($id, $email, $password){
        $notificationId = new Id();
        $notificationId->isValid($id??'') 
            ? $notificationId->set($id) 
            : $notificationId->new();

        $notification = $this->factory->mapResult([
            'id' => $notificationId->toString(),
            'email' => $email,
            'password' => $password
        ]);
        
        $this->setup->set($notification);
        $this->setOutput($notification);
        return $this;
    }
}