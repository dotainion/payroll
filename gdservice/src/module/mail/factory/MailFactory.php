<?php
namespace src\module\mail\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\mail\objects\Mail;

class MailFactory extends Collector{
    use Factory;

    public function __construct(){
    }
    
    public function mapResult($record):Mail{
        $bank = new Mail();
        $bank->setId($this->uuid($record['id']));
        $bank->setSubject($record['subject']);
        $bank->setBody($record['body']);
        return $bank;
    }
}