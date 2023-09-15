<?php
namespace src\module\notification\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Notification implements IObjects{
    protected Id $id; 
    protected Id $userId;
    protected bool $created;
    protected bool $updated;
    protected bool $deleted;
    protected bool $mentioned;


    function __construct(){
        $this->id = new Id();
        $this->userId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function userId():IId{
        return $this->userId;
    }

    public function created():bool{
        return $this->created;
    }

    public function updated():bool{
        return $this->updated;
    }

    public function deleted():bool{
        return $this->deleted;
    }

    public function mentioned():bool{
        return $this->mentioned;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setUserId(string $userId):void{
        $this->userId->set($userId);
    }

    public function setCreated(string $created):void{
        $this->created = $created;
    }

    public function setUpdated(bool $updated):void{
        $this->updated = $updated;
    }

    public function setDeleted(bool $deleted):void{
        $this->deleted = $deleted;
    }

    public function setMentioned(bool $mentioned):void{
        $this->mentioned = $mentioned;
    }
}