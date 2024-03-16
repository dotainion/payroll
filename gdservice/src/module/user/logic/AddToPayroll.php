<?php
namespace src\module\user\logic;

use src\infrastructure\Id;
use src\module\user\repository\UserRepository;

class AddToPayroll{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function add(Id $id):void{
        $this->repo->addToPayroll($id);
    }
}