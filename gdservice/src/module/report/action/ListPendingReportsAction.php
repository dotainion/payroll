<?php
namespace src\module\report\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\report\service\ListPendingReportsService;

class ListPendingReportsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListPendingReportsService();
    }

    public function execute(){
        return $this->service->process();
    }
}