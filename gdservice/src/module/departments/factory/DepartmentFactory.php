<?php
namespace src\module\departments\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\departments\objects\Department;

class DepartmentFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Department{
        $department = new Department();
        $department->setId($this->uuid($record['deptId'] ?? $record['id']));
        $department->setName($record['deptName'] ?? $record['name']);
        $department->setHide($record['deptHide'] ?? $record['hide']);
        return $department;
    }
}