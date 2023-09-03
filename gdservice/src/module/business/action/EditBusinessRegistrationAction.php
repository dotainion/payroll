<?php
namespace src\module\business\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\business\service\EditBusinessRegistrationService;

class EditBusinessRegistrationAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new EditBusinessRegistrationService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name'),
            $this->get('email'),
            $this->get('city'),
            $this->get('country'),
            $this->get('address'),
            $this->get('isOrganization'),
        );
    }
}