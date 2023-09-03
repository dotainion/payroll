<?php
namespace src\module\report\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Overtime implements IObjects{
    protected Id $id;
    protected Id $userId;
    protected Id $reportId;
    protected string $name;
    protected string $rate;
    protected string $hours;
    protected string $amount;
    protected DateHelper $date;
    protected string $totalAmount;
    protected ?float $ytd = null;
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

    public function name(){
        return $this->name;
    }
    
    public function rate(){
        return $this->rate;
    }
    
    public function hours(){
        return $this->hours;
    }
        
    public function date():DateHelper{
        return $this->date;
    }

    public function hide():bool{
        return $this->hide;
    }
    
    public function amount(){
        return $this->amount;
    }
    
    public function totalAmount(){
        return $this->totalAmount;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setUserId(string $id):void{
        $this->userId->set($id);
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
    
    public function setRate(string $rate):void{
        $this->rate = $rate;
    }
    
    public function setHours(string $hours):void{
        $this->hours = $hours;
    }
    
    public function setAmount(string $amount):void{
        $this->amount = $amount;
    }
    
    public function setTotalAmount(string $totalAmount):void{
        $this->totalAmount = $totalAmount;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}