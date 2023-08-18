<?php
namespace src\module\report\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\report\service\DeleteAllowanceReportService;

class DeleteAllowanceReportAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new DeleteAllowanceReportService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id')
        );
    }
}