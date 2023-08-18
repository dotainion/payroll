<?php
namespace src\module\business\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\business\service\BusinessRegistrationService;

class BusinessRegistrationAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new BusinessRegistrationService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('name'),
            $this->get('email'),
            $this->get('city'),
            $this->get('country'),
            $this->get('address'),
            $this->get('password'),
            $this->get('confirmPassword'),
            $this->get('isOrganization'),
        );
    }
}