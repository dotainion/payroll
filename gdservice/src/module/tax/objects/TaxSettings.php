<?php
namespace src\module\tax\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\infrastructure\TaxHelper;

class TaxSettings implements IObjects{
    protected Id $id;
    protected ?bool $active = null;
    protected ?string $percentage = null;
    protected ?string $limitAmount = null;
    protected ?bool $auto = null;
    protected ?bool $notify = null;
    protected ?bool $notifyAndAuto = null;
    protected ?string $alert = null;

    public function __construct(){
        $this->id = new Id();
    }
        
    public function id():IId{
        return $this->id;
    }
        
    public function percentage():?string{
        return $this->percentage;
    }
        
    public function active():?bool{
        return $this->active;
    }
        
    public function limitAmount():?string{
        return $this->limitAmount;
    }

    public function alert():?string{
        return $this->alert;
    }

    public function auto():?bool{
        return $this->auto;
    }
    
    public function notify():?bool{
        return $this->notify;
    }
    
    public function notifyAndAuto():?bool{
        return $this->notifyAndAuto;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }
        
    public function setActive(bool $active):void{
        $this->active = $active;
    }

    public function setPercentage(?string $percentage):void{
        $this->percentage = $percentage;
    }
    
    public function setAlert(?string $alert):void{
        $this->alert = $alert;
        $this->auto = $alert === TaxHelper::AUTO;
        $this->notify = $alert === TaxHelper::NOTIFY;
        $this->notifyAndAuto = $alert === TaxHelper::NOTIFY_AND_AUTO;
    }
    
    public function setLimitAmount(?string $limitAmount):void{
        $this->limitAmount = $limitAmount;
    }
}