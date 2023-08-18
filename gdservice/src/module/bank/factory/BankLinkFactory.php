<?php
namespace src\module\bank\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\bank\objects\BankLink;

class BankLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }
    
    public function mapResult($record):BankLink{
        $bank = new BankLink();
        $bank->setId($this->uuid($record['bankLinkId'] ?? $record['id']));
        $bank->setBankId($this->uuid($record['bankId']));
        $bank->setUserId($this->uuid($record['userId']));
        $bank->setHide($record['bankHide'] ?? $record['hide']);
        $bank->setNumber($record['bankNumber'] ?? $record['number']);
        if(isset($record['bankName']) || isset($record['name'])){
            $bank->setName($record['bankName'] ?? $record['name']);
        }
        return $bank;
    }
}