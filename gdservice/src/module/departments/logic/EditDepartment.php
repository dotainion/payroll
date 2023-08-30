<?php
namespace src\module\accounts\objects;

use src\module\departments\objects\Department;
use src\module\departments\repository\DepartmentsRepository;

class EditDepartment{
    protected DepartmentsRepository $repo;

    function __construct(){
        $this->repo = new DepartmentsRepository();
    }

    public function edit(Department $department):void{
        $this->repo->edit($department);
    }
}