<?php
namespace src\module\allowanceDeductionIdLink\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\allowanceDeductionIdLink\service\SetAllowanceDeductionIdLinkService;

class SetAllowanceDeductionIdLinkAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetAllowanceDeductionIdLinkService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('cmd')
        );
    }
}