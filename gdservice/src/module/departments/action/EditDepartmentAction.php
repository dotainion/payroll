<?php
namespace src\module\departments\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\departments\service\EditDepartmentService;

class EditDepartmentAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new EditDepartmentService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name')
        );
    }
}