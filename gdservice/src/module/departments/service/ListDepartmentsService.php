<?php
namespace src\module\departments\service;

use src\infrastructure\Service;
use src\module\accounts\objects\ListDepartments;

class ListDepartmentsService extends Service{
    protected ListDepartments $list;

    public function __construct(){
        parent::__construct();
        $this->list = new ListDepartments();
    }
    
    public function process(){
        $collector = $this->list->departments();

        $this->setOutput($collector);
        return $this;
    }
}