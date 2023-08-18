<?php
namespace src\module\bank\logic;

use src\module\bank\objects\BankLink;
use src\module\bank\repository\BankLinkRepository;

class CreateBankLink{
    protected BankLinkRepository $repo;
    protected AssertBankLinkExist $assert;

    public function __construct(){
        $this->repo = new BankLinkRepository();
        $this->assert = new AssertBankLinkExist();
    }
    
    public function create(BankLink $bank){
        $this->assert->assertBankLinkNotExist($bank->number(), $bank->userId());
        return $this->repo->create($bank);
    }
}