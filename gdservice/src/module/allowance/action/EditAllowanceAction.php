<?php
namespace src\module\allowance\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\allowance\service\EditAllowanceService;

class EditAllowanceAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new EditAllowanceService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name'),
            $this->get('type'),
            $this->get('rate'),
            $this->get('amount'),
            $this->get('rateAmount'),
            $this->get('taxExemption')
        );
    }
}