<?php
namespace src\module\settings\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\settings\logic\CalculateOperan;
use src\module\settings\logic\FetchOvertime;

class FetchOvertimeSettingsService extends Service{
    protected FetchOvertime $fetch;
    protected CalculateOperan $calculate;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchOvertime();
        $this->calculate = new CalculateOperan();
    }
    
    public function process($id, $userId){
        Assert::validUuid($id, 'OT settings not found.');
        
        $collector = $this->fetch->fetchOvertime((new Id())->set($id));
        
        $id = null;
        if((new Id())->isValid($userId??'')){
            $id = (new Id())->set($userId);
        }

        $this->calculate->calculateInCollection($collector, $id);

        $this->setOutput($collector);
        return $this;
    }
}