<?php
namespace src\module\bank\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\bank\logic\ListBankByUser;

class ListBankByUserService extends Service{
    protected ListBankByUser $banks;

    public function __construct(){
        parent::__construct();
        $this->banks = new ListBankByUser();
    }
    
    public function process($id){
        $userId = new Id();
        $userId->set($id);

        $collector = $this->banks->banksByUserId($userId);

        $this->setOutput($collector);
        return $this;
    }
}