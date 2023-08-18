<?php
namespace src\module\report\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\report\service\CreateBulkReportService;

class CreateBulkReportAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreateBulkReportService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('reports')
        );
    }
}