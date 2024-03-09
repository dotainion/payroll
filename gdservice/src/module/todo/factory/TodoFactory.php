<?php
namespace src\module\todo\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\infrastructure\Id;
use src\module\todo\objects\Todo;

class TodoFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Todo{
        $todo = new Todo();
        $todo->setId($this->uuid($record['id']));
        $todo->setUserId($this->uuid($record['userId']));
        if((new Id())->isValid($record['assignToId']??'')){
            $todo->setAssignToId($this->uuid($record['assignToId']));
        }
        $todo->setTitle((string)$record['title']);
        $todo->setDescription((string)$record['description']);
        $todo->setCreated($record['created']);
        $todo->setDue($record['due']);
        $todo->setHide((bool)$record['hide']);
        $todo->setIsDone((bool)$record['done']);
        return $todo;
    }
}