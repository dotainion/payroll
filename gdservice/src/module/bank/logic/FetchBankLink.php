<?php
namespace src\module\bank\logic;

use src\infrastructure\Id;
use src\module\bank\repository\BankLinkRepository;

class FetchBankLink{
    protected BankLinkRepository $repo;

    public function __construct(){
        $this->repo = new BankLinkRepository();
    }
    
    public function bankById(Id $id){
        return $this->repo->listBanks([
            'id' => $id,
            'hide' => false
        ]);
    }
}