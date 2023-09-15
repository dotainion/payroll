<?php
namespace src\module\notification\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\notification\service\FetchUserNotificationSettingService;

class FetchUserNotificationSettingAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new FetchUserNotificationSettingService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId')
        );
    }
}