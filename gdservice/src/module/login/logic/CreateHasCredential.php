<?php
namespace src\module\login\logic;

use src\module\login\objects\HasCredential;
use src\module\login\repository\CredentialRepository;

class CreateHasCredential{
    protected CredentialRepository $repo;

    public function __construct(){
        $this->repo = new CredentialRepository();
    }

    public function create(HasCredential $credential):void{
        $this->repo->createHasCreds($credential);
    }
}