<?php
namespace src\module\user\logic;

use src\infrastructure\Collector;
use src\module\user\repository\UserRepository;

class ListUsersInPayroll{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function usersInPayroll():Collector{
        return $this->repo->listUsers([
            'inPayroll' => true,
            'hide' => false
        ]);
    }
}