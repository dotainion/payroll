<?php
namespace src\module\bank\service;

use src\infrastructure\Service;
use src\module\bank\logic\ListBanks;

class ListBanksService extends Service{
    protected ListBanks $banks;

    public function __construct(){
        parent::__construct();
        $this->banks = new ListBanks();
    }
    
    public function process(){
        $collector = $this->banks->banks();

        $this->setOutput($collector);
        return $this;
    }
}