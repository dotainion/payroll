<?php
namespace src\module\bank\logic;

use src\infrastructure\Id;
use src\module\bank\repository\BankLinkRepository;

class DeleteBankLink{
    protected BankLinkRepository $repo;
    protected AssertBankLinkExist $assert;

    public function __construct(){
        $this->repo = new BankLinkRepository();
        $this->assert = new AssertBankLinkExist();
    }
    
    public function delete(Id $id){
        return $this->repo->deleteBank($id);
    }
}