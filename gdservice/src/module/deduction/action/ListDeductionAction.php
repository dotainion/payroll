<?php
namespace src\module\deduction\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\deduction\service\ListDeductionService;

class ListDeductionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListDeductionService();
    }

    public function execute(){
        return $this->service->process();
    }
}
