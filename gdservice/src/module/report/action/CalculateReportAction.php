<?php
namespace src\module\report\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\report\service\CalculateReportService;
use src\module\report\service\CreateReportService;

class CalculateReportAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CalculateReportService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('allowance'),
            $this->get('deduction'),
            $this->get('loanAllowances'),
            $this->get('loanDeductions'),
            $this->get('sickLeaves'),
            $this->get('overtime'),
            $this->get('noPayLeaveAllowances'),
            $this->get('noPayLeaveDeductions'),
            $this->get('period'),
            $this->get('notified')
        );
    }
}