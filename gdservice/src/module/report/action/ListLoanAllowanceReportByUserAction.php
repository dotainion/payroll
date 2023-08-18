<?php
namespace src\module\report\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\report\service\LsitLoanAllowanceReportByUserService;

class ListLoanAllowanceReportByUserAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new LsitLoanAllowanceReportByUserService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id')
        );
    }
}