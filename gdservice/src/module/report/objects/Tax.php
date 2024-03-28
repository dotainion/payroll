<?php
namespace src\module\report\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Tax implements IObjects{
    protected Id $id;
    protected Id $userId;
    protected Id $reportId;
    protected string $name;
    protected ?float $amount;
    protected ?string $number;
    protected ?float $ytd = null;
    protected DateHelper $date;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
        $this->userId = new Id();
        $this->reportId = new Id();
        $this->date = new DateHelper();
    }
        
    public function id():IId{
        return $this->id;
    }
        
    public function userId():IId{
        return $this->userId;
    }
        
    public function reportId():IId{
        return $this->reportId;
    }
        
    public function ytd():?string{
        return $this->ytd;
    }
        
    public function net():?float{
        return $this->amount();
    }

    public function name(){
        return $this->name;
    }

    public function number(){
        return $this->number;
    }
        
    public function date():DateHelper{
        return $this->date;
    }

    public function hide():bool{
        return $this->hide;
    }
    
    public function amount():?float{
        return $this->amount;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setUserId(string $userId):void{
        $this->userId->set($userId);
    }
        
    public function setYtd(float $ytd):void{
        $this->ytd = $ytd;
    }
        
    public function setDate(string $date):void{
        $this->date->set($date);
    }

    public function setReportId(string $reportId):void{
        $this->reportId->set($reportId);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }
    
    public function setNumber(?string $number):void{
        $this->number = $number;
    }

    public function setAmount(?float $amount):void{
        $this->amount = $amount;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}