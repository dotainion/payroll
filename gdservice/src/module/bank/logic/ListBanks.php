<?php
namespace src\module\bank\logic;

use src\module\bank\repository\BankRepository;

class ListBanks{
    protected BankRepository $repo;

    public function __construct(){
        $this->repo = new BankRepository();
    }
    
    public function banks(){
        return $this->repo->listBanks([
            'hide' => false
        ]);
    }
}