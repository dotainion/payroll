<?php
namespace src\module\settings\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\settings\service\FetchProrateSettingsService;

class FetchProrateSettingsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new FetchProrateSettingsService();
    }

    public function execute(){
        return $this->service->process();
    }
}