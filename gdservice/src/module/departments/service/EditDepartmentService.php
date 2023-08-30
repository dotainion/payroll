<?php
namespace src\module\departments\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\accounts\objects\EditDepartment;
use src\module\departments\factory\DepartmentFactory;

class EditDepartmentService extends Service{
    protected DepartmentFactory $factory;
    protected EditDepartment $department;

    public function __construct(){
        parent::__construct();
        $this->factory = new DepartmentFactory();
        $this->department = new EditDepartment();
    }
    
    public function process($id, $name){
        Assert::validUuid($id, 'Department not found.');
        Assert::stringNotEmpty($name, 'Department name is required.');

        $department = $this->factory->mapResult([
            'id' => (new Id())->set($id)->toString(),
            'name' => $name,
            'hide' => false
        ]);

        $this->department->edit($department);

        $this->setOutput($department);
        return $this;
    }
}