<?php
namespace src\module\mail\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\mail\objects\Attatchment;

class AttatchmentFactory extends Collector{
    use Factory;

    public function __construct(){
    }
    
    public function mapResult($record):Attatchment{
        $bank = new Attatchment();
        $bank->setId($this->uuid($record['id']));
        $bank->setMailId($this->uuid($record['mailId']));
        $bank->setImage($record['image'] ?? $record['img']);
        $bank->setContentKey($record['contentKey'] ?? $record['contentId']);
        return $bank;
    }
}