<?php
namespace src\module\settings\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\settings\service\DeleteOvertimeSettingsService;

class DeleteOvertimeSettingsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new DeleteOvertimeSettingsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id')
        );
    }
}