<?php
namespace src\module\report\objects;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class LoanDeduction implements IObjects{
    protected Id $id;
    protected Id $userId;
    protected string $name;
    protected string $number;
    protected string $amount;
    protected Id $reportId;
    protected ?float $ytd = null;
    protected DateHelper $date;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
        $this->userId = new Id();
        $this->reportId = new Id();
        $this->date = new DateHelper();
    }

    public function hide():bool{
        return $this->hide;
    }
        
    public function id():IId{
        return $this->id;
    }
        
    public function userId():IId{
        return $this->userId;
    }
        
    public function ytd():?string{
        return $this->ytd;
    }
        
    public function net(){
        return $this->amount();
    }

    public function name(){
        return $this->name;
    }
        
    public function date():DateHelper{
        return $this->date;
    }
    
    public function number(){
        return $this->number;
    }
    
    public function amount(){
        return $this->amount;
    }

    public function reportId():IId{
        return $this->reportId;
    }
        
    public function setYtd(float $ytd):void{
        $this->ytd = $ytd;
    }
        
    public function setDate(string $date):void{
        $this->date->set($date);
    }

    public function setId(string $id):void{
        Assert::validUuid($id, 'Invalid id.');
        $this->id->set($id);
    }

    public function setUserId(string $userId):void{
        Assert::validUuid($userId, 'Invalid id.');
        $this->userId->set($userId);
    }

    public function setName(string $name):void{
        Assert::stringNotEmpty($name, 'Name is required.');
        $this->name = $name;
    }
    
    public function setNumber(string $number):void{
        Assert::stringNotEmpty($number, 'Number is required.');
        $this->number = $number;
    }
    
    public function setAmount(string $amount):void{
        Assert::stringNotEmpty($amount, 'Amount is required.');
        $this->amount = $amount;
    }

    public function setReportId(string $reportId):void{
        Assert::validUuid($reportId, 'Invalid id.');
        $this->reportId->set($reportId);
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}

