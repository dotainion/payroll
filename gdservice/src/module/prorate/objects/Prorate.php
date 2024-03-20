<?php
namespace src\module\prorate\objects;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class Prorate implements IObjects{
    protected Id $id;
    protected Id $userId;
    protected Id $reportId;
    protected DateHelper $date;
    protected bool $hide;
    protected DateHelper $from;
    protected DateHelper $to;

    public function __construct(){
        $this->id = new Id();
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

    public function date():DateHelper{
        return $this->date;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function from():DateHelper{
        return $this->from;
    }

    public function to():DateHelper{
        return $this->to;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setUserId(string $userId):void{
        $this->userId->set($userId);
    }

    public function setreportId(string $reportId):void{
        $this->reportId->set($reportId);
    }

    public function setDate(string $date):void{
        $this->date->set($date);
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }

    public function setFrom(string $from):void{
        $this->from->set($from);
    }

    public function setTo(string $to):void{
        $this->to->set($to);
    }
}