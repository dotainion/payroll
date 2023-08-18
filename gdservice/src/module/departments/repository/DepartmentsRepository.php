<?php
namespace src\module\departments\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\departments\factory\DepartmentFactory;

class DepartmentsRepository extends Repository{
    protected DepartmentFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DepartmentFactory();
    }

    public function departments():Collector{
        $departments = [
            ['name' => 'Accounts', 'id' => (new Id())->new()->toString()], 
            ['name' => 'Operations', 'id' => (new Id())->new()->toString()], 
            ['name' => 'IT', 'id' => (new Id())->new()->toString()], 
            ['name' => 'Marketing', 'id' => (new Id())->new()->toString()], 
            ['name' => 'Human Resource', 'id' => (new Id())->new()->toString()], 
            ['name' => 'Special projects', 'id' => (new Id())->new()->toString()]
        ];
        return $this->factory->map($departments);
    }
}