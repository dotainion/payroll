<?php
namespace src\module\bank\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\bank\service\EditBankLinkService;

class EditBankLinkAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new EditBankLinkService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'), 
            $this->get('bankId'), 
            $this->get('userId'), 
            $this->get('number')
        );
    }
}