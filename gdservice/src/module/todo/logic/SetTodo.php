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
        $collector = $this->repo->listTodo([
            'title' => $todo->title(),
            'hide' => false
        ]);
        $collector->assertItemNotExist('Todo title already exist.');
        $this->repo->create($todo);
    }
}