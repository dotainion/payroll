<?php
namespace src\module\business\service;

use src\infrastructure\Service;
use src\module\business\logic\FetchBusiness;

class FetchBusinessService extends Service{
    protected FetchBusiness $fetch;

    public function __construct(){
        parent::__construct(false);
        $this->fetch = new FetchBusiness();
    }
    
    public function process(){
        $collector = $this->fetch->business();

        $this->setOutput($collector);
        return $this;
    }
}