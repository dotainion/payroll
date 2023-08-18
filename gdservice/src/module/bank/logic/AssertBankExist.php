<?php
namespace src\module\bank\logic;

use InvalidArgumentException;
use src\infrastructure\Id;
use src\module\bank\repository\BankRepository;

class AssertBankExist{
    protected BankRepository $repo;

    public function __construct(){
        $this->repo = new BankRepository();
    }

    public function assertBankNotExist(string $name, $message='Bank already exist.'):bool{
        $collector = $this->repo->listBanks(['name' => $name, 'hide' => false]);
        $collector->assertItemNotExist($message);
        return true;
    }

    public function assertBankExistById(Id $id, $message='Bank not found.'):bool{
        $collector = $this->repo->listBanks(['id' => $id, 'hide'=> false]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException($message);
        }
        return true;
    }
}