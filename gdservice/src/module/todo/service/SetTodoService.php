<?php
namespace src\module\todo\service;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\todo\factory\TodoFactory;
use src\module\todo\logic\SetTodo;
use src\module\user\logic\FetchUser;

class SetTodoService extends Service{
    protected SetTodo $todo;
    protected TodoFactory $factory;
    protected FetchUser $user;

    public function __construct(){
        parent::__construct();
        $this->todo = new SetTodo();
        $this->factory = new TodoFactory();
        $this->user = new FetchUser();
    }
    
    public function process($id, $userId, $assignToId, $title, $description, $due){
        $idObj = new Id();
        $todo = $this->factory->mapResult([
            'id' => $idObj->isValid($id??'') ? $id : $idObj->new()->toString(),
            'userId' => $userId,
            'assignToId' => $assignToId,
            'title' => $title,
            'description' => $description,
            'created' => (new DateHelper())->now()->toString(),
            'due' => (new DateHelper())->set($due)->toString(),
            'hide' => false,
            'done' => false,
        ]);
        
        if($todo->assignToId() !== null){
            $user = $this->user->user($todo->assignToId());
            $user->hasItem() && $todo->setUserAssign($user->first());
        }

        $this->todo->set($todo);

        $this->setOutput($todo);
        return $this;
    }
}