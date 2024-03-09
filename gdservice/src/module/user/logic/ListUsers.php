<?php
namespace src\module\user\logic;

use src\infrastructure\Collector;
use src\module\user\repository\UserRepository;

class ListUsers{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function users():Collector{
        return $this->repo->listUsers([
            'hide' => false
        ]);
    }

    public function usersByIdArray(array $userId):Collector{
        if(empty($userId)){
            return new Collector();
        }
        return $this->repo->listUsers([
            'id' => $userId,
            'hide' => false
        ]);
    }
}