<?php
namespace src\module\notification\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\notification\service\FetchNotificationSetupService;

class FetchNotificationSetupAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new FetchNotificationSetupService();
    }

    public function execute(){
        return $this->service->process();
    }
}