<?php
namespace src\module\tax\service;

use src\infrastructure\Service;
use src\module\tax\logic\ListTaxSettings;

class ListTaxSettingsService extends Service{
    protected ListTaxSettings $tax;

    public function __construct(){
        parent::__construct();
        $this->tax = new ListTaxSettings();
    }
    
    public function process(){
        $collector = $this->tax->list();
        $this->setOutput($collector);
        return $this;
    }
}