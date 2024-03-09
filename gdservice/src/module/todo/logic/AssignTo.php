<?php
namespace src\module\todo\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\todo\repository\TodoRepository;

class AssignTo{
    protected TodoRepository $repo;
    protected FetchTodo $todo;

    public function __construct(){
        $this->repo = new TodoRepository();
        $this->todo = new FetchTodo();
    }
    
    public function to(Id $id, Id $userId):Collector{
        $this->repo->assignTodo($id, $userId);
        return $this->todo->todo($id);
    }
}