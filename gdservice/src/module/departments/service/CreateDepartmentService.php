<?php
namespace src\module\departments\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\accounts\objects\CreateDepartment;
use src\module\departments\factory\DepartmentFactory;

class CreateDepartmentService extends Service{
    protected DepartmentFactory $factory;
    protected CreateDepartment $department;

    public function __construct(){
        parent::__construct();
        $this->factory = new DepartmentFactory();
        $this->department = new CreateDepartment();
    }
    
    public function process($name){
        Assert::stringNotEmpty($name, 'Department name is required.');

        $department = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'name' => $name,
            'hide' => false
        ]);

        $this->department->create($department);

        $this->setOutput($department);
        return $this;
    }
}