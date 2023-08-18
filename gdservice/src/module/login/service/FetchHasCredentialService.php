<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\login\logic\FetchHasCredential;

class FetchHasCredentialService extends Service{
    protected FetchHasCredential $credential;

    public function __construct(){
        parent::__construct();
        $this->credential = new FetchHasCredential();
    }
    
    public function process($id){
        Assert::validUuid($id, 'User not found.');
        $collector = $this->credential->fetch((new Id())->set($id));
        $this->setOutput($collector);
        return $this;
    }
}