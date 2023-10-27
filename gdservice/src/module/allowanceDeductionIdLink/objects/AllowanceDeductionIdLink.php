<?php
namespace src\module\allowanceDeductionIdLink\objects;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class AllowanceDeductionIdLink implements IObjects{
    protected Id $id;
    protected string $cmd;

    public function __construct(){
        $this->id = new Id();
    }
        
    public function id():IId{
        return $this->id;
    }

    public function cmd(){
        return $this->cmd;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setCmd(string $cmd):void{
        Assert::stringNotEmpty($cmd, 'Name is required.');
        $this->cmd = $cmd;
    }
}

