<?php
namespace src\module\bank\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\bank\service\DeleteBankLinkService;

class DeleteBankLinkAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new DeleteBankLinkService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id')
        );
    }
}