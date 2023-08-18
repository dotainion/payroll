<?php
namespace src\module\bank\logic;

use src\module\bank\objects\Bank;
use src\module\bank\repository\BankRepository;

class CreateBank{
    protected BankRepository $repo;
    protected AssertBankExist $assert;

    public function __construct(){
        $this->repo = new BankRepository();
        $this->assert = new AssertBankExist();
    }
    
    public function create(Bank $bank){
        $this->assert->assertBankNotExist($bank->name());
        return $this->repo->create($bank);
    }
}