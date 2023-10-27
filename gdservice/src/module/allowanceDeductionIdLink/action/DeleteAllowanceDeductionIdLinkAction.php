<?php
namespace src\module\allowanceDeductionIdLink\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\allowanceDeductionIdLink\service\DeleteAllowanceDeductionIdLinkService;

class DeleteAllowanceDeductionIdLinkAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new DeleteAllowanceDeductionIdLinkService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id')
        );
    }
}