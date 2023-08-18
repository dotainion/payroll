<?php
namespace src\module\bank\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\bank\logic\DeleteBank;

class DeleteBankService extends Service{
    protected DeleteBank $bank;

    public function __construct(){
        parent::__construct();
        $this->bank = new DeleteBank();
    }
    
    public function process($id){
        $this->bank->delete((new Id())->set($id));

        return $this;
    }
}