<?php
namespace src\module\accounts\objects;

use src\infrastructure\Id;
use src\module\departments\repository\DepartmentsRepository;

class DeleteDepartment{
    protected DepartmentsRepository $repo;

    function __construct(){
        $this->repo = new DepartmentsRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteDepartment($id);
    }
}