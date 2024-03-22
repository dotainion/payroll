<?php
namespace src\module\todo\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\todo\logic\ListTodoByUser;
use src\module\user\logic\ListUsers;

class ListTodoByUserService extends Service{
    protected ListTodoByUser $todos;
    protected ListUsers $users;

    public function __construct(){
        parent::__construct();
        $this->todos = new ListTodoByUser();
        $this->users = new ListUsers();
    }
    
    public function process($userId, $value){
        Assert::validUuid($userId, 'Todo not found.');

        $id = new Id();
        $id->set($userId);

        if($value === 'completed'){
            $collector = $this->todos->completed($id);
        }elseif($value === 'overDue'){
            $collector = $this->todos->overdueByUserId($id);
        }elseif($value === 'pending'){
            $collector = $this->todos->pending($id);
        }elseif($value === 'assignToMe'){
            $collector = $this->todos->assignTo($id);
        }elseif($value === 'createdByMe'){
            $collector = $this->todos->createdBy($id);
        }else{
            $collector = $this->todos->createdBy($id);
            $collector->mergeCollection($this->todos->assignTo($id));
        }

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