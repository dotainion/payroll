<?php
namespace src\module\settings\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class ProrateSettings implements IObjects{
    protected Id $id;
    protected bool $biMonthly;
    protected bool $off;

    public function __construct(){
        $this->id = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function biMonthly():bool{
        return $this->biMonthly;
    }

    public function off():bool{
        return $this->off;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setBiMonthly(bool $biMonthly):void{
        $this->biMonthly = $biMonthly;
    }

    public function setOff(bool $off):void{
        $this->off = $off;
    }
}