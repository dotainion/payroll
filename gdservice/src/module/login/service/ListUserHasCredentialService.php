<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use src\module\login\logic\FetchHasCredential;
use src\module\user\logic\ListUsers;

class ListUserHasCredentialService extends Service{
    protected FetchHasCredential $credential;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct();
        $this->credential = new FetchHasCredential();
        $this->users = new ListUsers();
    }
    
    public function process(){
        $collector = $this->users->users();
        $credsCollector = $this->credential->fetchByIdArray($collector->toIdArray());

        foreach($collector->list() as $user){
            foreach($credsCollector->list() as $creds){
                if($user->id()->toString() === $creds->id()->toString()){
                    $user->setHasCredential(true);
                }
            }
        }

        $this->setOutput($collector);
        return $this;
    }
}