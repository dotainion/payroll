<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\Service;
use src\security\SecurityManager;

class FetchSessionService extends Service{
    protected SecurityManager $manager;

    public function __construct(){
        parent::__construct(false);
        $this->manager = new SecurityManager();
    }
    
    public function process($token){
        Assert::validToken($token, 'Invalid token');
        if($this->manager->hasSession() && $this->manager->session()->token()->toString() === $token){
            $this->manager->assertUserAccess();
            $this->setOutput($this->manager->user());
            return $this;
        }
        throw new NotAuthenticatedException('Your are not authenticted.');
    }
}