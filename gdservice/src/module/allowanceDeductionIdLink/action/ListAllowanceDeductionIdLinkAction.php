<?php
namespace src\module\allowanceDeductionIdLink\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\allowanceDeductionIdLink\service\ListAllowanceDeductionIdLinkService;

class ListAllowanceDeductionIdLinkAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListAllowanceDeductionIdLinkService();
    }

    public function execute(){
        return $this->service->process();
    }
}