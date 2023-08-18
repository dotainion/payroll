<?php
namespace src\module\report\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class SickLeave implements IObjects{
    protected Id $id;
    protected Id $userId;
    protected string $name;
    protected DateHelper $date;
    protected DateHelper $from;
    protected DateHelper $to;
    protected string $amount;
    protected Id $reportId;
    protected Id $fileId;
    protected ?float $ytd = null;
    protected bool $hide;

    public function __construct(){
        $this->id = new Id();
        $this->userId = new Id();
        $this->fileId = new Id();
        $this->reportId = new Id();
        $this->date = new DateHelper();
        $this->from = new DateHelper();
        $this->to = new DateHelper();
    }
        
    public function id():IId{
        return $this->id;
    }

    public function hide():bool{
        return $this->hide;
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
    
    public function userId():IId{
        return $this->userId;
    }
    
    public function fileId():IId{
        return $this->fileId;
    }
        
    public function date():DateHelper{
        return $this->date;
    }
        
    public function from():DateHelper{
        return $this->from;
    }
        
    public function to():DateHelper{
        return $this->to;
    }
    
    public function amount(){
        return $this->amount;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }
        
    public function setYtd(float $ytd):void{
        $this->ytd = $ytd;
    }
        
    public function setDate(string $date):void{
        $this->date->set($date);
    }
        
    public function setFrom(string $from):void{
        $this->from->set($from);
    }
        
    public function setTo(string $to):void{
        $this->to->set($to);
    }

    public function setReportId(string $reportId):void{
        $this->reportId->set($reportId);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }
    
    public function setUserId(string $userId):void{
        $this->userId->set($userId);
    }
    
    public function setFileId(string $fileId):void{
        $this->fileId->set($fileId);
    }
    
    public function setAmount(string $amount):void{
        $this->amount = $amount;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}