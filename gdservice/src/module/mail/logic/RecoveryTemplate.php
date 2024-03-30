<?php
namespace src\module\mail\logic;

use src\infrastructure\Env;

class RecoveryTemplate{
    protected $refreshToken;
    protected $domainName;
    protected $route;
    protected $dir;

    public function __construct(){
        $this->domainName = $_SERVER['SERVER_NAME'];
        $this->route = '/update/credential/by/token/';
        $this->dir = '/'.Env::uiDir();
    }

    private function href():string{
        return $this->domainName.$this->dir.'/#'.$this->route.$this->refreshToken;
    }

    public function setToken(string $refreshToken):void{
        $this->refreshToken = $refreshToken;
    }

    public function recovery():string{
        return '
            <h2><b>Pay Roll Application</b></h2>
            <a href="'.$this->href().'">Click here to recover your account.</a>
            <p>If you did not attempt to recover your account, you can safely ignore this email.</p>
        ';
    }

    public function assignCredential():string{
        return '
            <h2><b>Pay Roll Application</b></h2>
            <a href="'.$this->href().'">Click here to accept access to this platform and create a password.</a>
        ';
    }

    public function removeCredential():string{
        return '
            <h2><b>Pay Roll Application</b></h2>
            <p>Your access to the payrol application was removed.</p>
            <p>If you think this is an error please visit your administrator for assistance.</p>
        ';
    }
}

