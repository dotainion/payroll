<?php
namespace src\module\report\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Allowance implements IObjects{
    protected Id $id;
    protected Id $reportId;
    protected string $name;
    protected string $type;
    protected string $rate;
    protected string $amount;
    protected ?float $ytd = null;
    protected DateHelper $date;
    protected string $rateAmount;
    protected string $totalAmount;
    protected bool $hide;
    protected ?string $number = null;
    protected ?Id $linkId = null;

    public function __construct(){
        $this->id = new Id();
        $this->linkId = new Id();
        $this->reportId = new Id();
        $this->date = new DateHelper();
    }
        
    public function id():IId{
        return $this->id;
    }
        
    public function reportId():IId{
        return $this->reportId;
    }
        
    public function ytd():?string{
        return $this->ytd;
    }
        
    public function net(){
        return $this->totalAmount();
    }
        
    public function number(){
        return $this->number;
    }

    public function linkId():?IId{
        if(!$this->linkId->hasId()){
            return null;
        }
        return $this->linkId;
    }

    public function name(){
        return $this->name;
    }
    
    public function type(){
        return $this->type;
    }
    
    public function rate(){
        return $this->rate;
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
    
    public function rateAmount(){
        return $this->rateAmount;
    }
    
    public function totalAmount(){
        return $this->totalAmount;
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

    public function setReportId(string $reportId):void{
        $this->reportId->set($reportId);
    }

    public function setNumber(?string $number):void{
        $this->number = $number;
    }

    public function setLinkId(string $linkId){
        $this->linkId->set($linkId);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }
    
    public function setType(string $type):void{
        $this->type = $type;
    }
    
    public function setRate(string $rate):void{
        $this->rate = $rate;
    }
    
    public function setAmount(string $amount):void{
        $this->amount = $amount;
    }
    
    public function setRateAmount(string $rateAmount):void{
        $this->rateAmount = $rateAmount;
    }
    
    public function setTotalAmount(string $totalAmount):void{
        $this->totalAmount = $totalAmount;
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
}