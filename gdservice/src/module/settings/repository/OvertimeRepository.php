<?php
namespace src\module\settings\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\settings\factory\OvertimeFactory;
use src\module\settings\objects\Overtime;

class OvertimeRepository extends Repository{
    protected OvertimeFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new OvertimeFactory();
    }
    
    public function create(Overtime $overtime):void{
        $this->insert('overtimeSettings')
            ->add('id', $this->uuid($overtime->id()))
            ->add('name', $overtime->name())
            ->add('active', (int)$overtime->active())
            ->add('prefix', $overtime->prefix()->value())
            ->add('suffix', $overtime->suffix()->value())
            ->add('operator', $overtime->operator());
        $this->execute();
    }
    
    public function edit(Overtime $overtime):void{
        $this->update('overtimeSettings')
            ->set('name', $overtime->name())
            ->set('active', (int)$overtime->active())
            ->set('prefix', $overtime->prefix()->value())
            ->set('suffix', $overtime->suffix()->value())
            ->set('operator', $overtime->operator())
            ->where('id', $this->uuid($overtime->id()));
        $this->execute();
    }
    
    public function deleteOvertime(Id $id):void{
        $this->delete('overtimeSettings')
            ->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function listOvertimeSettings(array $where=[]):Collector{
        $this->select('overtimeSettings');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}