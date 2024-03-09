<?php
namespace src\module\todo\logic;

use src\module\todo\objects\Todo;
use src\module\todo\repository\TodoRepository;

class SetTodo{
    protected TodoRepository $repo;

    public function __construct(){
        $this->repo = new TodoRepository();
    }
    
    public function set(Todo $todo){
        $collector = $this->repo->listTodo([
            'id' => $todo->id(),
            'hide' => false
        ]);
        if($collector->hasItem()){
            $this->repo->edit($todo);
            return;
        }
        $this->repo->create($todo);
    }
}