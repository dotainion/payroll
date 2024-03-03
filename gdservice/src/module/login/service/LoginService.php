<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\Email;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\Password;
use src\infrastructure\Service;
use src\security\SecurityManager;
use src\security\ValidatePassword;

class LoginService extends Service{
    protected SecurityManager $security;

    public function __construct(){
        parent::__construct(false);
        $this->security = new SecurityManager();
    }
    
    public function process($email, $password){
        if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
            throw new NotAuthenticatedException('Invalid email');
        }
        if(empty($string)){
            throw new NotAuthenticatedException('Invalid password');
        }
        $validate = new ValidatePassword();
        $validate->validate($password);
        if($validate->chain()->hasError()){
            $validate->chain()->prependMessage('Invalid Password.');
            throw new NotAuthenticatedException($validate->chain()->messages());
        }

        $emailObj = new Email();
        $emailObj->set($email);
        $passwordObj = new Password();
        $passwordObj->set($password);

        $this->security->login($emailObj, $passwordObj);
        
        $this->setOutput($this->security->user());
        return $this;
    }
}