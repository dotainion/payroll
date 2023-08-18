<?php
namespace src\module\settings\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\settings\service\SetSickLeaveSettingsService;

class SetSickLeaveSettingsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetSickLeaveSettingsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('excludedDays'),
            $this->get('includeSalary'),
            $this->get('percentageOfSalary'),
            $this->get('includeAllowances'),
            $this->get('includeDeductions')
        );
    }
}