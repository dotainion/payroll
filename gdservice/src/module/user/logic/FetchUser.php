<?php
namespace src\module\user\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\user\repository\UserRepository;

class FetchUser{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function user(Id $id):Collector{
        return $this->repo->listUsers(['id' => $id, 'hide' => false]);
    }
}