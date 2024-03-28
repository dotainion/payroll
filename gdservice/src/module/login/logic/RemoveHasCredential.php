<?php
namespace src\module\login\logic;

use src\infrastructure\Id;
use src\module\login\repository\CredentialRepository;

class RemoveHasCredential{
    protected CredentialRepository $repo;

    public function __construct(){
        $this->repo = new CredentialRepository();
    }

    public function remove(Id $id):void{
        $this->repo->removeHasCreds($id);
    }
}