<?php
namespace src\module\notification\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\notification\service\SetNotificationSetupService;

class SetNotificationSetupAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetNotificationSetupService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'), 
            $this->get('email'), 
            $this->get('password')
        );
    }
}