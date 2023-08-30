<?php
namespace src\module\accounts\objects;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\departments\repository\DepartmentsRepository;

class FetchDepartment{
    protected DepartmentsRepository $repo;

    function __construct(){
        $this->repo = new DepartmentsRepository();
    }

    public function departmentById(Id $id):Collector{
        return $this->repo->departments([
            'id' => $id,
            'hide' => false
        ]);
    }
}