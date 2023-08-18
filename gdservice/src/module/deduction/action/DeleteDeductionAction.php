<?php
namespace src\module\deduction\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\deduction\service\DeleteDeductionService;

class DeleteDeductionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new DeleteDeductionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id')
        );
    }
}
