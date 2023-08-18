<?php
namespace src\module\bank\logic;

use src\module\bank\objects\BankLink;
use src\module\bank\repository\BankLinkRepository;

class EditBankLink{
    protected BankLinkRepository $repo;
    protected AssertBankLinkExist $assert;

    public function __construct(){
        $this->repo = new BankLinkRepository();
        $this->assert = new AssertBankLinkExist();
    }
    
    public function edit(BankLink $bank){
        return $this->repo->edit($bank);
    }
}