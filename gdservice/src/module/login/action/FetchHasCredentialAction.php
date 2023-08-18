<?php
namespace src\module\login\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\login\service\FetchHasCredentialService;

class FetchHasCredentialAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new FetchHasCredentialService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id')
        );
    }
}