<?php
namespace src\module\bank\logic;

use src\infrastructure\Id;
use src\module\bank\repository\BankLinkRepository;

class ListBankByUser{
    protected BankLinkRepository $repo;

    public function __construct(){
        $this->repo = new BankLinkRepository();
    }
    
    public function banksByUserId(Id $userId){
        return $this->repo->listBanks([
            'userId' => $userId,
            'hide' => false
        ]);
    }
}