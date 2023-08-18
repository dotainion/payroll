<?php
namespace src\module\settings\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\settings\factory\SickLeaveFactory;
use src\module\settings\objects\SickLeave;

class SickLeaveRepository extends Repository{
    protected SickLeaveFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new SickLeaveFactory();
    }
    
    public function create(SickLeave $sickLeave):void{
        $this->insert('sickLeaveSettings')        
            ->add('id', $this->uuid($sickLeave->id()))
            ->add('includeSalary', $sickLeave->includeSalary())
            ->add('percentageOfSalary', $sickLeave->percentageOfSalary())
            ->add('excludedDays', implode(', ', $sickLeave->excludedDays()))
            ->add('includeAllowances', implode(', ', $sickLeave->includeAllowances()))
            ->add('includeDeductions', implode(', ', $sickLeave->includeDeductions()));
        $this->execute();
    }
    
    public function edit(SickLeave $sickLeave, Id $id):void{
        $this->update('sickLeaveSettings')        
            ->set('includeSalary', $sickLeave->includeSalary())
            ->set('percentageOfSalary', $sickLeave->percentageOfSalary())
            ->set('excludedDays', implode(', ', $sickLeave->excludedDays()))
            ->set('includeAllowances', implode(', ', $sickLeave->includeAllowances()))
            ->set('includeDeductions', implode(', ', $sickLeave->includeDeductions()))
            ->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function fetchSickLeaveSettings():Collector{
        $this->select('sickLeaveSettings');
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}