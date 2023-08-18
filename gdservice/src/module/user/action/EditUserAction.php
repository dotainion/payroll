<?php
namespace src\module\user\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\user\service\EditUserService;

class EditUserAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new EditUserService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('userId'),
            $this->get('name'),
            $this->get('email'),
            $this->get('hide'),
            $this->get('salary'),
            $this->get('dob'),
            $this->get('taxId'),
            $this->get('otRate'),
            $this->get('gender'),
            $this->get('number'),
            $this->get('city'),
            $this->get('state'),
            $this->get('address'),
            $this->get('department'),
            $this->get('emergencyNumber'),
            $this->get('registrationDate'),
        );
    }
}