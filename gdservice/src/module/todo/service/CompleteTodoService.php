<?php
namespace src\module\todo\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\todo\logic\CompleteTodo;
use src\module\user\logic\FetchUser;

class CompleteTodoService extends Service{
    protected CompleteTodo $todo;
    protected FetchUser $user;

    public function __construct(){
        parent::__construct();
        $this->todo = new CompleteTodo();
        $this->user = new FetchUser();
    }
    
    public function process($id, $complete){
        Assert::validUuid($id, 'Todo not found.');
        
        $idObj = new Id();
        $collector = $this->todo->complete($idObj->set($id), $complete);
        $collector->assertHasItemForUi('Todo not found.');
        $todo = $collector->first();
        if($idObj->isValid($todo->assignToId()??'')){
            $user = $this->user->user($todo->assignToId());
            $user->hasItem() && $todo->setUserAssign($user->first());
        }

        $this->setOutput($todo);
        return $this;
    }
}