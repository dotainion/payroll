<?php
namespace src\module\todo\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\todo\service\SetTodoService;

class SetTodoAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetTodoService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('userId'),
            $this->get('assignToId'),
            $this->get('title'),
            $this->get('description'),
            $this->get('due')
        );
    }
}