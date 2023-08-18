<?php
namespace src\module\bank\logic;

use src\module\bank\objects\Bank;
use src\module\bank\repository\BankRepository;

class EditBank{
    protected BankRepository $repo;
    protected AssertBankExist $assert;

    public function __construct(){
        $this->repo = new BankRepository();
        $this->assert = new AssertBankExist();
    }
    
    public function edit(Bank $bank){
        $this->assert->assertBankNotExist($bank->name());
        return $this->repo->edit($bank);
    }
}