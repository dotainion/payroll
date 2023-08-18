<?php
namespace src\module\bank\logic;

use src\infrastructure\Id;
use src\module\bank\repository\BankLinkRepository;

class AssertBankLinkExist{
    protected BankLinkRepository $repo;

    public function __construct(){
        $this->repo = new BankLinkRepository();
    }

    public function assertBankLinkNotExist(string $number, Id $userId, $message='Bank already exist.'):bool{
        $collector = $this->repo->listBanks(['number' => $number, 'userId' => $userId, 'hide' => false]);
        $collector->assertItemNotExist($message);
        return true;
    }

    public function assertBankLinkNotExistByNumber(string $number, $message='Bank already exist.'):bool{
        $collector = $this->repo->listBanks(['number' => $number, 'hide' => false]);
        $collector->assertItemNotExist($message);
        return true;
    }
}