<?php
namespace src\module\todo\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\todo\repository\TodoRepository;

class DeleteTodo{
    protected TodoRepository $repo;
    protected FetchTodo $todo;

    public function __construct(){
        $this->repo = new TodoRepository();
        $this->todo = new FetchTodo();
    }
    
    public function delete(Id $id):Collector{
        $collector = $this->todo->todo($id);
        $this->repo->deleteTodo($id);
        return $collector;
    }
}