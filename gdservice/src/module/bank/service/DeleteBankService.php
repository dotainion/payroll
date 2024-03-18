<?php
namespace src\module\bank\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\bank\logic\DeleteBank;
use src\module\bank\logic\FetchBank;

class DeleteBankService extends Service{
    protected DeleteBank $bank;
    protected FetchBank $fetch;

    public function __construct(){
        parent::__construct();
        $this->bank = new DeleteBank();
        $this->fetch = new FetchBank();
    }
    
    public function process($id){
        $bankId = (new Id())->set($id);
        
        $collector = $this->fetch->bank($bankId);
        $this->bank->delete($bankId);

        $this->setOutput($collector);
        return $this;
    }
}