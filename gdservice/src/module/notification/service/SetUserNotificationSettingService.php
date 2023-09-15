<?php
namespace src\module\notification\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\login\logic\SetUserNotificationSetting;
use src\module\notification\factory\NotificationFactory;

class SetUserNotificationSettingService extends Service{
    protected SetUserNotificationSetting $setup;
    protected NotificationFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->setup = new SetUserNotificationSetting();
        $this->factory = new NotificationFactory();
    }
    
    public function process($id, $userId, $created, $updated, $deleted, $mentioned){
        Assert::validUuid($userId, 'User not found.');
        
        $idObj = new Id();
        $idObj->isValid($id??'') 
            ? $idObj->set($id) 
            : $idObj->new();

        $notification = $this->factory->mapResult([
            'id' => $idObj,
            'userId' => $userId,
            'created' => $created ?? false,
            'updated' => $updated ?? false,
            'deleted' => $deleted ?? false,
            'mentioned' => $mentioned ?? false
        ]);

        $this->setup->set($notification);
        $this->setOutput($notification);
        return $this;
    }
}