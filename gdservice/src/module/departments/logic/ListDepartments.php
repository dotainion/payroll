<?php
namespace src\module\accounts\objects;

use src\infrastructure\Collector;
use src\module\departments\repository\DepartmentsRepository;

class ListDepartments{
    protected DepartmentsRepository $repo;

    function __construct(){
        $this->repo = new DepartmentsRepository();
    }

    public function departments():Collector{
        return $this->repo->departments();
    }
}