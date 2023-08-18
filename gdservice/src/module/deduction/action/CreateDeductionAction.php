<?php
namespace src\module\deduction\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\deduction\service\CreateDeductionService;

class CreateDeductionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreateDeductionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('name'),
            $this->get('type'),
            $this->get('rate'),
            $this->get('amount'),
            $this->get('rateAmount')
        );
    }
}
