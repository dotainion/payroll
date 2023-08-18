<?php
namespace src\module\settings\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\settings\factory\SickLeaveFactory;
use src\module\settings\logic\SetSickLeave;

class SetSickLeaveSettingsService extends Service{
    protected SickLeaveFactory $factory;
    protected SetSickLeave $create;

    public function __construct(){
        parent::__construct();
        $this->factory = new SickLeaveFactory();
        $this->create = new SetSickLeave();
    }
    
    public function process($id, $excludedDays, $includeSalary, $percentageOfSalary, $includeAllowances, $includeDeductions){
        $idObj = new Id();
        $idObj->isValid($id??'') ? $idObj->set($id) : $idObj->new();
        $sickLeave = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'includeSalary' => $includeSalary,
            'percentageOfSalary' => $percentageOfSalary,
            'excludedDays' => implode(', ',$excludedDays ?? []),
            'includeAllowances' => implode(', ', $includeAllowances ?? []),
            'includeDeductions' => implode(', ', $includeDeductions ?? [])
        ]);
        $this->create->setSickLeave($sickLeave);
        $this->setOutput($sickLeave);
        return $this;
    }
}