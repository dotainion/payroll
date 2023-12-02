<?php
namespace src\module\settings\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\settings\logic\DeleteOvertime;
use src\module\settings\logic\FetchOvertime;

class DeleteOvertimeSettingsService extends Service{
    protected DeleteOvertime $overtime;
    protected FetchOvertime $fetch;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchOvertime();
        $this->overtime = new DeleteOvertime();
    }
    
    public function process($id){
        Assert::validUuid($id, 'OT settings not found.');
        
        $collector = $this->fetch->fetchOvertime((new Id())->set($id));
        $collector->assertHasItemForUi('Overtime settings not found.');
        $this->overtime->delete((new Id())->set($id));

        $this->setOutput($collector);
        return $this;
    }
}