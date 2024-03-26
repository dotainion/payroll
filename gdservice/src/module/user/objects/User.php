<?php
namespace src\module\user\objects;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Email;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\infrastructure\IUser;
use src\infrastructure\Token;
use src\infrastructure\UserId;

class User implements IObjects, IUser{
    protected Id $id;
    protected UserId $userId;
    protected string $name;
    protected Email $email;
    protected bool $hide;
    protected string $gender;
    protected string $number;
    protected ?Token $token = null;
    protected string $emergencyNumber;
    protected DateHelper $registrationDate;
    protected string $salary;
    protected DateHelper $dob;
    protected string $taxId;
    protected string $nisId;
    protected string $otRate;
    protected string $city;
    protected string $state;
    protected string $address;
    protected bool $inPayroll;
    protected string $department;
    protected bool $hasCredential = false;

    public function __construct(){
        $this->id = new Id();
        $this->userId = new UserId();
        $this->token = new Token();
        $this->dob = new DateHelper();
        $this->email = new Email();
        $this->registrationDate = new DateHelper();
    }

    public function id():IId{
        return $this->id;
    }

    public function userId():IId{
        return $this->userId;
    }
    
    public function name():string{
        return $this->name;
    }

    public function email():string{
        return $this->email->toString();
    }

    public function hide():bool{
        return $this->hide;
    }

    public function gender():string{
        return $this->gender;
    }

    public function number():string{
        return $this->number;
    }

    public function token():?string{
        if(!$this->token->hasToken()){
            return null;
        }
        return $this->token->toString();
    }

    public function emergencyNumber():string{
        return $this->emergencyNumber;
    }

    public function registrationDate():string{
        return $this->registrationDate->toString();
    }
    
    public function salary():string{
        return $this->salary;
    }

    public function inPayroll():bool{
        return $this->inPayroll;
    }

    public function dob():DateHelper{
        return $this->dob;
    }

    public function taxId():string{
        return $this->taxId;
    }

    public function nisId():string{
        return $this->nisId;
    }

    public function otRate():string{
        return $this->otRate;
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

    public function department():string{
        return $this->department;
    }

    public function hasCredential():bool{
        return $this->hasCredential;
    }
    
    public function setSalary(string $salary):void{
        $this->salary = $salary;
    }

    public function setDob(string $dob):void{
        Assert::validDate($dob, 'Invalid date of birth.');
        $this->dob->set($dob);
    }

    public function setTaxId(string $taxId):void{
        $this->taxId = $taxId;
    }

    public function setNisId(string $nisId):void{
        $this->nisId = $nisId;
    }

    public function setOtRate(string $otRate):void{
        $this->otRate = $otRate;
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

    public function setDepartment(string $department):void{
        Assert::stringNotEmpty($department, 'Department is required');
        $this->department = $department;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setUserId(string $userId):void{
        Assert::stringNotEmpty($userId, 'Invalid user id');
        $this->userId->set($userId);
    }
    
    public function setName(string $name):void{
        Assert::stringNotEmpty($name, 'Name is required');
        $this->name = $name;
    }

    public function setInPayroll(bool $inPayroll):void{
        $this->inPayroll = $inPayroll;
    }

    public function setEmail(string $email):void{
        $this->email->set($email);
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }

    public function setGender(string $gender):void{
        if(!in_array(strtolower($gender), ['male', 'female'])){
            throw new InvalidArgumentException('Invalid gender.');
        }
        $this->gender = $gender;
    }

    public function setNumber(string $number):void{
        $this->number = $number;
    }

    public function setToken(string $token):void{
        $this->token->set($token);
    }

    public function setEmergencyNumber(string $emergencyNumber):void{
        $this->emergencyNumber = $emergencyNumber;
    }

    public function setRegistrationDate(string $registrationDate):void{
        Assert::validDate($registrationDate, 'Invalid registration date.');
        $this->registrationDate->set($registrationDate);
    }

    public function setHasCredential(bool $hasCredential):void{
        $this->hasCredential = $hasCredential;
    }
}