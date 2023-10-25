<?php
namespace src\module\tax\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\tax\service\ListTaxSettingsService;

class ListTaxSettingsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListTaxSettingsService();
    }

    public function execute(){
        return $this->service->process();
    }
}