<?php
namespace src\module\user\logic;

use InvalidArgumentException;
use src\infrastructure\Id;
use src\module\user\repository\UserRepository;

class AssertUserInfo{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function assertUniquteEmail($email, ?Id $userId=null):bool{
        $collector = $this->repo->listUsers([
            'hide' => false,
            'email' => $email,
        ]);
        if($userId !== null){
            foreach($collector->list() as $user){
                if($user->id()->toString() !== $userId->toString()){
                    throw new InvalidArgumentException("Employee Email ($email) already exist.");
                }
            }
            return true;
        }
        $collector->assertItemNotExist("Employee Email ($email) already exist.");
        return true;
    }

    public function assertUniquteUserId($userId, ?Id $currentUserId=null):bool{
        $collector = $this->repo->listUsers([
            'hide' => false,
            'userId' => $userId,
        ]);
        if($userId !== null){
            foreach($collector->list() as $user){
                if($user->id()->toString() !== $currentUserId->toString()){
                    throw new InvalidArgumentException("Employee ID ($userId) already exist.");
                }
            }
            return true;
        }
        $collector->assertItemNotExist("Employee ID ($userId) already exist.");
        return true;
    }
}