<?php
namespace src\module\todo\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\todo\repository\TodoRepository;

class CompleteTodo{
    protected TodoRepository $repo;
    protected FetchTodo $todo;

    public function __construct(){
        $this->repo = new TodoRepository();
        $this->todo = new FetchTodo();
    }
    
    public function complete(Id $id, bool $complete):Collector{
        $this->repo->completeTodo($id, $complete);
        return $this->todo->todo($id);
    }
}