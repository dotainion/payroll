<?php
namespace src\module\todo\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\todo\logic\ListTodoByUser;
use src\module\user\logic\ListUsers;

class ListOverDueTodoByUserService extends Service{
    protected ListTodoByUser $todos;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct();
        $this->todos = new ListTodoByUser();
        $this->users = new ListUsers();
    }
    
    public function process($userId){
        Assert::validUuid($userId, 'Todo not found.');

        $id = new Id();
        $collector = $this->todos->overdueByUserId($id->set($userId));

        $userIdArray = [];
        foreach($collector->list() as $todo){
            if($todo->assignToId() !== null){
                $userIdArray[] = $todo->assignToId();
            }
        }
        $users = $this->users->usersByIdArray($userIdArray);
        foreach($collector->list() as $todo){
            if($todo->assignToId() === null){
                continue;
            }
            foreach($users->list() as $user){
                if($todo->assignToId()->toString() !== null && $user->id()->toString()){
                    $todo->setUserAssign($user);
                    break;
                }
            }
        }

        $this->setOutput($collector);
        return $this;
    }
}