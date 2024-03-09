<?php
namespace src\module\todo\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\todo\repository\TodoRepository;

class ListTodoByUser{
    protected TodoRepository $repo;

    public function __construct(){
        $this->repo = new TodoRepository();
    }
    
    public function byUserId(Id $id):Collector{
        $collector = $this->repo->listTodo([
            'userId' => $id,
            'hide' => false
        ]);
        $assignCollector = (new $this->repo)->listTodo([
            'assignToId' => $id,
            'hide' => false
        ]);
        $collector->mergeCollection($assignCollector);
        return $collector;
    }
}