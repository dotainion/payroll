<?php
namespace src\module\notification\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\login\logic\FetchUserNotificationSetting;

class FetchUserNotificationSettingService extends Service{
    protected FetchUserNotificationSetting $fetch;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchUserNotificationSetting();
    }
    
    public function process($userId){
        Assert::validUuid($userId, 'User not found.');

        $userIdObj = new Id();
        $userIdObj->set($userId);

        $collector = $this->fetch->fetchNotifiction($userIdObj);
        $this->setOutput($collector);
        return $this;
    }
}