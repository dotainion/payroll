<?php
namespace src\module\todo\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\todo\factory\TodoFactory;
use src\module\todo\objects\Todo;

class TodoRepository extends Repository{
    protected TodoFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new TodoFactory();
    }

    public function create(Todo $todo):void{
        $this->insert('todo')
            ->add('id', $this->uuid($todo->id()))
            ->add('userId', $this->uuid($todo->userId()))
            ->add('title', $todo->title())
            ->add('description', $todo->description())
            ->add('created', $todo->created())
            ->add('due', $todo->due())
            ->add('hide', (int)$todo->hide())
            ->add('done', (int)$todo->isDone());

            if($todo->assignToId() !== null){
                $this->add('assignToId', $this->uuid($todo->assignToId()));
            }
    
        $this->execute();
    }
    
    public function edit(Todo $todo):void{
        $this->update('todo')
            ->set('userId', $this->uuid($todo->userId()))
            ->set('title', $todo->title())
            ->set('description', $todo->description())
            //->set('created', $todo->created())
            ->set('due', $todo->due())
            ->set('hide', (int)$todo->hide())
            //->set('done', (int)$todo->isDone())
            ->where('id', $this->uuid($todo->id()));

        if($todo->assignToId() !== null){
            $this->set('assignToId', $this->uuid($todo->assignToId()));
        };

        $this->execute();
    }
    
    public function completeTodo(Id $id, bool $complete=true):void{
        $this->update('todo')        
            ->set('done', (int)$complete)
            ->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function assignTodo(Id $id, Id $userId):void{
        $this->update('todo')        
            ->set('assignToId', $this->uuid($userId))
            ->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function deleteTodo(Id $id):void{
        $this->update('todo')        
            ->set('hide', 1)
            ->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function listTodo(array $where=[]):Collector{
        $this->select('todo');
        if(isset($where['hide'])){
            $this->where('hide', (int)$where['hide']);
        }
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        if(isset($where['title'])){
            $this->where('title', $where['title']);
        }
        if(isset($where['done'])){
            $this->where('done', (int)$where['done']);
        }
        if(isset($where['lessThen'])){
            $this->lessThan('due', $where['lessThen']);
        }
        if(isset($where['assignToId'])){
            $this->where('assignToId', $this->uuid($where['assignToId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}