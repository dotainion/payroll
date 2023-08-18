<?php
namespace src\module\login\logic;

use src\infrastructure\ICredential;
use src\module\login\repository\CredentialRepository;

class CreateCredential{
    protected CredentialRepository $repo;

    public function __construct(){
        $this->repo = new CredentialRepository();
    }

    public function create(ICredential $credential):void{
        $this->repo->create($credential);
    }
}