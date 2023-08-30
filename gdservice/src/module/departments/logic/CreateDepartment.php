<?php
namespace src\module\accounts\objects;

use src\module\departments\objects\Department;
use src\module\departments\repository\DepartmentsRepository;

class CreateDepartment{
    protected DepartmentsRepository $repo;

    function __construct(){
        $this->repo = new DepartmentsRepository();
    }

    public function create(Department $department):void{
        $this->repo->create($department);
    }
}