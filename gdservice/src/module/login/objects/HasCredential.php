<?php
namespace src\module\login\objects;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IObjects;

class HasCredential implements  IObjects{
    protected Id $id;
    protected DateHelper $expire;
    protected string $refreshToken;

    public function __construct(){
        $this->id = new Id();
        $this->expire = new DateHelper();
    }

    public function id():Id{
        return $this->id;
    }

    public function expire():DateHelper{
        return $this->expire;
    }

    public function refreshToken():string{
        return $this->refreshToken;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setExpire(string $expire):void{
        Assert::validDate($expire, 'Expire time is required.');
        $this->expire->set($expire);
    }

    public function setRefreshToken(string $refreshToken):void{
        $this->refreshToken = $refreshToken;
    }
}