<?php
namespace src\module\report\objects;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class AllowanceDeductionIdLink implements IObjects{
    protected Id $linkId;
    protected Id $reportLinkId;

    public function __construct(){
        $this->linkId = new Id();
        $this->reportLinkId = new Id();
    }
        
    public function id():IId{
        return (new Id())->new();
    }

    public function linkId(){
        return $this->linkId;
    }

    public function reportLinkId(){
        return $this->reportLinkId;
    }

    public function setLinkId(string $linkId):void{
        $this->linkId->set($linkId);
    }

    public function setReportLinkId(string $reportLinkId):void{
        $this->reportLinkId->set($reportLinkId);
    }
}

