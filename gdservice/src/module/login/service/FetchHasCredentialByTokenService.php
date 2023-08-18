<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\infrastructure\Token;
use src\module\login\logic\FetchHasCredential;
use src\module\user\logic\FetchUser;

class FetchHasCredentialByTokenService extends Service{
    protected FetchUser $user;
    protected FetchHasCredential $credential;

    public function __construct(){
        parent::__construct(false);
        $this->user = new FetchUser();
        $this->credential = new FetchHasCredential();
    }
    
    public function process($refreshToken){
        Assert::validToken($refreshToken, 'Invalid token.');

        $token = new Token();
        $token->set($refreshToken);

        $collector = $this->credential->fetchByToken($token);
        $users = $this->user->user($collector->first()->id());
        
        $this->setOutput($users);
        $this->setOutput($collector);
        return $this;
    }
}