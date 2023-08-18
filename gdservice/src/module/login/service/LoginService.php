<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\Email;
use src\infrastructure\Password;
use src\infrastructure\Service;
use src\security\SecurityManager;

class LoginService extends Service{
    protected SecurityManager $security;

    public function __construct(){
        parent::__construct(false);
        $this->security = new SecurityManager();
    }
    
    public function process($email, $password){
        Assert::validEmail($email, 'Invalid email');
        Assert::stringNotEmpty($password, 'Invalid password');

        $emailObj = new Email();
        $emailObj->set($email);
        $passwordObj = new Password();
        $passwordObj->set($password);

        $this->security->login($emailObj, $passwordObj);
        
        $this->setOutput($this->security->user());
        return $this;
    }
}