<?php
namespace src\module\tax\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\tax\service\SetTaxSettingsService;

class SetTaxSettingsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetTaxSettingsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('active'),
            $this->get('percentage'),
            $this->get('limitAmount'),
            $this->get('notify'),
            $this->get('auto'),
            $this->get('notifyAndAuto')
        );
    }
}