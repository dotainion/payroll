<?php
namespace src\security;

use src\infrastructure\Id;

class Logout{
    protected SecurityRepository $repo;

    public function __construct(){
        $this->repo = new SecurityRepository();
    }

    public function logout(Id $id):void{
        $this->repo->removeToken($id);
    }
}