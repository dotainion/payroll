<?php
namespace src\module\documents\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\documents\service\FetchAllowanceDeductionService;

class FetchAllowanceDeductionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new FetchAllowanceDeductionService();
    }

    public function execute(){
        return $this->service->process();
    }
}
