<?php
namespace src\module\notification\objects;

use src\infrastructure\Assert;
use src\infrastructure\Email;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\infrastructure\Password;

class NotificationSetup implements IObjects{
    protected Id $id; 
    protected Email $email;
    protected ?Password $password;

    function __construct(){
        $this->id = new Id();
        $this->email = new Email();
    }

    public function id():IId{
        return $this->id;
    }

    public function email():Email{
        return $this->email;
    }

    public function password():?Password{
        return $this->password;
    }

    public function setId(string $id):void{
        Assert::validUuid($id, 'Invalid id.');
        $this->id->set($id);
    }

    public function setEmail(string $email):void{
        Assert::validEmail($email, 'Invalid email.');
        $this->email->set($email);
    }

    public function setPassword(string $password):void{
        Assert::validPassword($password, 'Invalid password.');
        $this->password = (new Password())->set($password);
    }

    public function unSetPassword():void{
        $this->password = null;
    }
}