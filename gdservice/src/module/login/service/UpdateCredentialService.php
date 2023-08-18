<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Password;
use src\infrastructure\Service;
use src\module\login\logic\UpdateCredential;

class UpdateCredentialService extends Service{
    protected UpdateCredential $creds;

    public function __construct(){
        parent::__construct();
        $this->creds = new UpdateCredential();
    }
    
    public function process($id, $password, $currentPassword){
        Assert::validUuid($id, 'Invalid user');
        Assert::validPassword($password, 'Invalid password');
        Assert::validPassword($currentPassword, 'Invalid password');

        $userId = new Id();
        $userId->set($id);
        $currentPasswordObj = new Password();
        $currentPasswordObj->set($currentPassword);
        $passwordObj = new Password();
        $passwordObj->set($password);

        $this->creds->updatecredential($userId, $currentPasswordObj, $passwordObj);
        
        return $this;
    }
}