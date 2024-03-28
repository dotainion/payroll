<?php
namespace src\module\todo\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\todo\repository\TodoRepository;

class ListTodoByUser{
    protected TodoRepository $repo;

    public function __construct(){
        $this->repo = new TodoRepository();
    }
    
    public function createdBy(Id $userId):Collector{
        return $this->repo->listTodo([
            'userId' => $userId,
            'hide' => false
        ]);
    }
    
    public function assignTo(Id $userId):Collector{
        return (new $this->repo)->listTodo([
            'assignToId' => $userId,
            'hide' => false
        ]);
    }
    
    public function completed(Id $userId):Collector{
        return $this->repo->listTodo([
            'userId' => $userId,
            'hide' => false,
            'done' => true
        ]);
    }
    
    public function pending(Id $userId):Collector{
        return $this->repo->listTodo([
            'userId' => $userId,
            'hide' => false,
            'moreThen' => (new DateHelper())->new()
        ]);
    }
    
    public function overdueByUserId(Id $userId):Collector{
        return $this->repo->listTodo([
            'userId' => $userId,
            'hide' => false,
            'done' => false,
            'lessThen' => (new DateHelper())->new(),
        ]);
    }
    
    public function overdueAssignTo(Id $userId):Collector{
        return (new $this->repo)->listTodo([
            'assignToId' => $userId,
            'hide' => false,
            'done' => false,
            'lessThen' => (new DateHelper())->new(),
        ]);
    }
}