<?php
namespace src\module\departments\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\departments\factory\DepartmentFactory;
use src\module\departments\objects\Department;

class DepartmentsRepository extends Repository{
    protected DepartmentFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DepartmentFactory();
    }

    public function create(Department $department):void{
        $this->insert('departments')        
            ->add('deptId', $this->uuid($department->id()))
            ->add('deptName', $department->name())
            ->add('deptHide', (int)$department->hide());
        $this->execute();
    }

    public function edit(Department $department):void{
        $this->update('departments')        
            ->set('deptName', $department->name())
            ->set('deptHide', (int)$department->hide())
            ->where('deptId', $this->uuid($department->id()));
        $this->execute();
    }

    public function deleteDepartment(Id $id):void{
        $this->update('departments')        
            ->set('deptHide', 1)
            ->where('deptId', $this->uuid($id));
        $this->execute();
    }

    public function departments(array $where=[]):Collector{
        $this->select('departments');
        if(isset($where['id'])){
            $this->where('deptId', $this->uuid($where['id']));
        }
        if(isset($where['hide'])){
            $this->where('deptHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}