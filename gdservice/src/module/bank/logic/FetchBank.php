<?php
namespace src\module\bank\logic;

use src\infrastructure\Id;
use src\module\bank\repository\BankRepository;

class FetchBank{
    protected BankRepository $repo;

    public function __construct(){
        $this->repo = new BankRepository();
    }
    
    public function bank(Id $id){
        return $this->repo->listBanks([
            'id' => $id,
            'hide' => false
        ]);
    }
}