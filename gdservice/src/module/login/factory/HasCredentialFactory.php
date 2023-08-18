<?php
namespace src\module\login\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\login\objects\HasCredential;

class HasCredentialFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):HasCredential{
        $business = new HasCredential();
        $business->setId($this->uuid($record['id']));
        $business->setExpire($record['expire']);
        $business->setRefreshToken($record['refreshToken']);
        return $business;
    }
}