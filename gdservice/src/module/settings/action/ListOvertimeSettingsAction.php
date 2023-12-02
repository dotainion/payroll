<?php
namespace src\module\settings\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\settings\service\ListOvertimeSettingsService;

class ListOvertimeSettingsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListOvertimeSettingsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId')
        );
    }
}