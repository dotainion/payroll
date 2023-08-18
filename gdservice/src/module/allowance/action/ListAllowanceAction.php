<?php
namespace src\module\allowance\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\allowance\service\ListAllowanceService;

class ListAllowanceAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListAllowanceService();
    }

    public function execute(){
        return $this->service->process();
    }
}