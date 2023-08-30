<?php
namespace src\module\departments\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\accounts\objects\DeleteDepartment;
use src\module\accounts\objects\FetchDepartment;

class DeleteDepartmentService extends Service{
    protected DeleteDepartment $department;
    protected FetchDepartment $fetch;

    public function __construct(){
        parent::__construct();
        $this->department = new DeleteDepartment();
        $this->fetch = new FetchDepartment();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Bank not found.');

        $idObj = new Id();
        $idObj->set($id);

        $collector = $this->fetch->departmentById($idObj);

        $this->department->delete($idObj);

        $this->setOutput($collector);
        return $this;
    }
}