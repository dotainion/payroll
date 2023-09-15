<?php
namespace src\module\notification\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\notification\factory\NotificationFactory;
use src\module\notification\objects\Notification;

class NotificationRepository extends Repository{
    protected NotificationFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new NotificationFactory();
    }
    
    public function create(Notification $notification):void{
        $this->insert('notification')        
            ->add('id', $this->uuid($notification->id()))
            ->add('userId', $this->uuid($notification->userId()))
            ->add('created', (int)$notification->created())
            ->add('updated', (int)$notification->updated())
            ->add('deleted', (int)$notification->deleted())
            ->add('mentioned', (int)$notification->mentioned());
        $this->execute();
    }
    
    public function edit(Notification $notification):void{
        $this->update('notification')        
            ->set('userId', $this->uuid($notification->userId()))
            ->set('created', (int)$notification->created())
            ->set('updated', (int)$notification->updated())
            ->set('deleted', (int)$notification->deleted())
            ->set('mentioned', (int)$notification->mentioned())
            ->where('id', $this->uuid($notification->id()));
        $this->execute();
    }
    
    public function listNotification(array $where=[]):Collector{
        $this->select('notification');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}