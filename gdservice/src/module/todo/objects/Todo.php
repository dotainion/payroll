<?php
namespace src\module\todo\objects;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\module\user\objects\User;

class Todo implements IObjects{
    protected Id $id;
    protected Id $userId;
    protected ?Id $assignToId = null;
    protected string $title;
    protected string $description;
    protected DateHelper $created;
    protected DateHelper $due;
    protected bool $hide;
    protected bool $isOverdue;
    protected bool $isUpComming;
    protected bool $isPending;
    protected bool $isDone;
    protected ?User $user = null;

    public function __construct(){
        $this->id = new Id();
        $this->userId = new Id();
        $this->created = new DateHelper();
        $this->due = new DateHelper();
    }
        
    public function id():IId{
        return $this->id;
    }

    public function userId():IId{
        return $this->userId;
    }

    public function userAssign():?User{
        return $this->user;
    }

    public function assignToId():?IId{
        return $this->assignToId;
    }

    public function title():string{
        return $this->title;
    }

    public function description():string{
        return $this->description;
    }

    public function created():DateHelper{
        return $this->created;
    }

    public function due():DateHelper{
        return $this->due;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function isOverdue():bool{
        if($this->isDone()){
            return false;
        }
        return (new DateHelper())->now()->expired($this->due());
    }

    public function isUpComming():bool{
        if($this->isDone()){
            return false;
        }
        return !$this->isOverdue();
    }

    public function isPending():bool{
        if($this->assignToId() !== null && !$this->isDone()){
            return true;
        }
        return false;
    }

    public function isDone():bool{
        return $this->isDone;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setUserId(string $userId):void{
        $this->userId->set($userId);
    }

    public function setAssignToId(string $assignToId):void{
        $this->assignToId = (new Id())->set($assignToId);
    }

    public function setTitle(string $title):void{
        if(strlen($title) > 100){
            throw new InvalidArgumentException('Title cannot exceed 100 charactors.');
        }
        $this->title = $title;
    }

    public function setDescription(string $description):void{
        if(strlen($description) > 255){
            throw new InvalidArgumentException('Description cannot exceed 255 charactors.');
        }
        $this->description = $description;
    }

    public function setCreated(string $created):void{
        $this->created->set($created);
    }

    public function setDue(string $due):void{
        $this->due->set($due);
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }

    public function setIsDone(bool $isDone):void{
        $this->isDone = $isDone;
    }

    public function setUserAssign(User $user):void{
        $this->user = $user;
    }
}

