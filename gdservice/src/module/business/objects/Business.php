<?php
namespace src\module\business\objects;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Email;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\infrastructure\IUser;
use src\infrastructure\Token;

class Business implements IObjects, IUser{
    protected Id $id;
    protected string $name;
    protected Email $email;
    protected string $city;
    protected string $state;
    protected string $address;
    protected DateHelper $date;
    protected ?Token $token = null;
    protected ?bool $isOrganization = null;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
        $this->email = new Email();
        $this->date = new DateHelper();
        $this->token = new Token();
    }

    public function id():IId{
        return $this->id;
    }

    public function hide():bool{
        return $this->hide;
    }
    
    public function name():string{
        return $this->name;
    }
    
    public function date():DateHelper{
        return $this->date;
    }

    public function email():string{
        return $this->email->toString();
    }

    public function city():string{
        return $this->city;
    }

    public function state():string{
        return $this->state;
    }

    public function address():string{
        return $this->address;
    }

    public function isOrganization():?bool{
        return $this->isOrganization;
    }

    public function token():?string{
        if(!$this->token->hasToken()){
            return null;
        }
        return $this->token->toString();
    }

    public function setCity(string $city):void{
        Assert::stringNotEmpty($city, 'City is required');
        $this->city = $city;
    }

    public function setState(string $state):void{
        Assert::stringNotEmpty($state, 'Country is required');
        $this->state = $state;
    }

    public function setAddress(string $address):void{
        Assert::stringNotEmpty($address, 'Address is required');
        $this->address = $address;
    }

    public function setIsOrganization(?bool $isOrganization):void{
        $this->isOrganization = $isOrganization;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setToken(string $token):void{
        $this->token->set($token);
    }

    public function setDate(string $date):void{
        $this->date->set($date);
    }
    
    public function setName(string $name):void{
        Assert::stringNotEmpty($name, 'Name is required');
        $this->name = $name;
    }

    public function setEmail(string $email):void{
        $this->email->set($email);
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}