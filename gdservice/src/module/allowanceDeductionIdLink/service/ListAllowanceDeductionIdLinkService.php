<?php
namespace src\module\allowanceDeductionIdLink\service;

use src\infrastructure\Service;
use src\module\allowanceDeductionIdLink\logic\ListAllowanceDeductionIdLink;

class ListAllowanceDeductionIdLinkService extends Service{
    protected ListAllowanceDeductionIdLink $options;

    public function __construct(){
        parent::__construct();
        $this->options = new ListAllowanceDeductionIdLink();
    }
    
    public function process(){
        $collector = $this->options->options();
        $this->setOutput($collector);
        return $this;
    }
}