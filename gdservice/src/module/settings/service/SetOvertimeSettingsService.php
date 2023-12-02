<?php
namespace src\module\settings\service;

use InvalidArgumentException;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\settings\factory\OvertimeFactory;
use src\module\settings\logic\SetOvertime;
use src\module\settings\objects\Operan;

class SetOvertimeSettingsService extends Service{
    protected OvertimeFactory $factory;
    protected SetOvertime $set;

    public function __construct(){
        parent::__construct();
        $this->factory = new OvertimeFactory();
        $this->set = new SetOvertime();
    }
    
    public function process($id, $name, $active, $prefix, $suffix, $operator){
        $idObj = new Id();
        $idObj->isValid($id??'') ? $idObj->set($id) : $idObj->new();
        $overtime = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'name' => $name,
            'active' => $active,
            'prefix' => $prefix,
            'suffix' => $suffix,
            'operator' => $operator
        ]);
        $this->set->setOvertime($overtime);

        if($active === true){
            if(!$overtime->prefix()->isValid()){
                throw new InvalidArgumentException('prefix can only be a valid number or select a placeholder from the available options.');
            }
            if(!$overtime->suffix()->isValid()){
                throw new InvalidArgumentException('suffix can only be a valid number or select a placeholder from the available options.');
            }
        }

        $this->setOutput($overtime);
        return $this;
    }
}