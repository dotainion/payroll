<?php
namespace src\module\notification\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\notification\service\SetUserNotificationSettingService;

class SetUserNotificationSettingAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetUserNotificationSettingService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'), 
            $this->get('userId'), 
            $this->get('created'), 
            $this->get('updated'), 
            $this->get('deleted'), 
            $this->get('mentioned')
        );
    }
}