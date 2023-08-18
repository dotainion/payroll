<?php
namespace src\module\bank\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\bank\service\ListBankByUserService;

class ListBankByUserAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListBankByUserService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id')
        );
    }
}