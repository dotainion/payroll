<?php
namespace src\security;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\infrastructure\ICredential;
use src\module\business\factory\BusinessFactory;
use src\module\user\factory\UserFactory;

class SecurityFactory extends Collector{
    use Factory;
    protected UserFactory $factory;
    protected BusinessFactory $businessFactory;

    public function __construct(){
        $this->factory = new UserFactory();
        $this->businessFactory = new BusinessFactory();
    }

    public function mapResult($record):ICredential{
        $security = new Security();
        $security->setId($this->uuid($record['id']));
        //$security->setExpire($record['expire']);
        if(isset($record['password'])){
            $security->setPassword($record['password']);
        }
        if(isset($record['token'])){
            $security->setToken($record['token']);
        }
        if(isset($record['refreshToken'])){
            $security->setRefreshToken($record['refreshToken']);
        }
        $security->setIsOrganization((bool)$record['isOrganization']);
        if(isset($record['email'])){
            if(isset($record['gender'])){
                $security->setUser($this->factory->mapResult($record));
            }else{
                $security->setUser($this->businessFactory->mapResult($record));
            }
        }
        return $security;
    }
}