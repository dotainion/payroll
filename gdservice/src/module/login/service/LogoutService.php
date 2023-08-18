<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use src\security\SecurityManager;

class LogoutService extends Service{
    protected SecurityManager $manager;

    public function __construct(){
        parent::__construct();
        $this->manager = new SecurityManager();
    }
    
    public function process(){
        $user = $this->manager->user();
        $this->manager->logout();
        $this->setOutput($user);
        return $this;
    }
}