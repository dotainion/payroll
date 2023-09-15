<?php
namespace src\module\notification\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\notification\factory\NotificationSetupFactory;
use src\module\notification\objects\NotificationSetup;

class NotificationSetupRepository extends Repository{
    protected NotificationSetupFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new NotificationSetupFactory();
    }
    
    public function create(NotificationSetup $notification):void{
        $this->insert('notificationSetup')        
            ->add('id', $this->uuid($notification->id()))
            ->add('email', $notification->email())
            ->add('password', $notification->password()->toHash());
        $this->execute();
    }
    
    public function edit(NotificationSetup $notification):void{
        $this->update('notificationSetup')        
            ->set('email', $notification->email()->toString())
            ->set('password', $notification->password()->toHash())
            ->where('id', $this->uuid($notification->id()));
        $this->execute();
    }
    
    public function listNotificationSetup(array $where=[]):Collector{
        $this->select('notificationSetup');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}