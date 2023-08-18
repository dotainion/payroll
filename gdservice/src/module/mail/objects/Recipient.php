<?php
namespace src\module\mail\objects;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Recipient implements IObjects{
    protected Id $id;
    protected Id $userId;
    protected string $recipient;

    public function __construct(){
        $this->id = new Id();
        $this->userId = new Id();
    }
        
    public function id():IId{
        return $this->id;
    }

    public function userId():IId{
        return $this->userId;
    }

    public function recipient():string{
        return $this->recipient;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setUserId(string $userId):void{
        Assert::validUuid($userId, 'User not found.');
        $this->userId->set($userId);
    }

    public function setRecipient(string $recipient):void{
        Assert::validEmail($recipient, 'Recipient email is invalid.');
        $this->recipient = $recipient;
    }
}

