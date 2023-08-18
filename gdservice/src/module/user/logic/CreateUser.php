<?php
namespace src\module\user\logic;

use src\infrastructure\Assert;
use src\module\user\repository\UserRepository;
use src\module\user\objects\User;

class CreateUser{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function create(User $user):void{
        Assert::emailNotExist($user->email());
        $this->repo->create($user);
    }
}