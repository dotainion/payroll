<?php
namespace src\module\bank\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\bank\service\CreateBankService;

class CreateBankAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreateBankService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('name')
        );
    }
}