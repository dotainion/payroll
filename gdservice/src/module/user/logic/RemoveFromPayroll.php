<?php
namespace src\module\user\logic;

use src\infrastructure\Id;
use src\module\user\repository\UserRepository;

class RemoveFromPayroll{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function remove(Id $id):void{
        $this->repo->removeFromPayroll($id);
    }
}