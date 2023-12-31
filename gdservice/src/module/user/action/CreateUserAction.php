<?php
namespace src\module\user\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\user\service\CreateUserService;

class CreateUserAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreateUserService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('name'),
            $this->get('email'),
            $this->get('hide'),
            $this->get('salary'),
            $this->get('dob'),
            $this->get('taxId'),
            $this->get('nisId'),
            $this->get('otRate'),
            $this->get('gender'),
            $this->get('number'),
            $this->get('city'),
            $this->get('state'),
            $this->get('address'),
            $this->get('department'),
            $this->get('emergencyNumber'),
            $this->get('registrationDate'),
            $this->get('banks')
        );
    }
}