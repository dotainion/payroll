<?php
namespace src\module\login\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\infrastructure\Token;
use src\module\login\repository\CredentialRepository;

class FetchHasCredential{
    protected CredentialRepository $repo;

    public function __construct(){
        $this->repo = new CredentialRepository();
    }

    public function fetch(Id $id):Collector{
        return $this->repo->listHasCredential([
            'id' => $id
        ]);
    }

    public function fetchByToken(Token $refreshToken):Collector{
        return $this->repo->listHasCredential([
            'refreshToken' => $refreshToken->toString()
        ]);
    }
}