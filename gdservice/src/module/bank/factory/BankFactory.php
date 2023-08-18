<?php
namespace src\module\bank\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\bank\objects\Bank;

class BankFactory extends Collector{
    use Factory;

    public function __construct(){
    }
    
    public function mapResult($record):Bank{
        $bank = new Bank();
        $bank->setId($this->uuid($record['bankId'] ?? $record['id']));
        $bank->setName($record['bankName'] ?? $record['name']);
        $bank->setHide($record['bankHide'] ?? $record['hide']);
        return $bank;
    }
}