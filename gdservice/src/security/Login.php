<?php
namespace src\security;

use src\infrastructure\Collector;
use src\infrastructure\Email;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\Id;
use src\infrastructure\Token;

class Login{
    protected SecurityRepository $repo;

    public function __construct(){
        $this->repo = new SecurityRepository();
    }

    public function login(Email $email):Collector{
        $collector = $this->repo->listSecurity([
            'email' => $email->toString()
        ]);
        if(!$collector->hasItem()){
            $collector = $this->repo->listBusinessSecurity([
                'email' => $email->toString()
            ]);
            if($collector->hasItem()){
                return $collector;
            }
            throw new NotAuthenticatedException('No account exist for this email.');
        }
        return $collector;
    }

    public function updateToken(Id $id, Token $token):void{
        $this->repo->updateToken($id, $token);
    }
}