<?php
namespace src\module\settings\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\settings\service\SetOvertimeSettingsService;

class SetOvertimeSettingsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetOvertimeSettingsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name'),
            $this->get('active'),
            $this->get('prefix'),
            $this->get('suffix'),
            $this->get('operator')
        );
    }
}