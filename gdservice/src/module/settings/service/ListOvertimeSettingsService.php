<?php
namespace src\module\settings\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\settings\logic\CalculateOperan;
use src\module\settings\logic\ListOvertime;

class ListOvertimeSettingsService extends Service{
    protected ListOvertime $overtime;
    protected CalculateOperan $calculate;

    public function __construct(){
        parent::__construct();
        $this->overtime = new ListOvertime();
        $this->calculate = new CalculateOperan();
    }
    
    public function process($userId){        
        $collector = $this->overtime->list();

        $id = null;
        if((new Id())->isValid($userId??'')){
            $id = (new Id())->set($userId);
        }

        $this->calculate->calculateInCollection($collector, $id);

        $this->setOutput($collector);
        return $this;
    }
}