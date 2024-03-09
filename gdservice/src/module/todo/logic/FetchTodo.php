<?php
namespace src\module\todo\logic;

use src\infrastructure\Id;
use src\module\todo\repository\TodoRepository;

class FetchTodo{
    protected TodoRepository $repo;

    public function __construct(){
        $this->repo = new TodoRepository();
    }
    
    public function todo(Id $id){
        return $this->repo->listTodo([
            'id' => $id,
            'hide' => false
        ]);
    }
}