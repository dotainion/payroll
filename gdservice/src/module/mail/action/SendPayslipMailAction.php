<?php
namespace src\module\mail\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\mail\service\SendPayslipMailService;

class SendPayslipMailAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SendPayslipMailService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('reportId'),
            $this->get('subject'),
            $this->get('body'),
            $this->get('attatchments')
        );
    }
}