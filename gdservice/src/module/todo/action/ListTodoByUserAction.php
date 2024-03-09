<?php
namespace src\module\todo\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\todo\service\ListTodoByUserService;

class ListTodoByUserAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListTodoByUserService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId')
        );
    }
}