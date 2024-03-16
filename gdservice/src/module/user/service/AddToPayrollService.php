<?php
namespace src\module\user\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\user\logic\AddToPayroll;
use src\module\user\logic\ListUsersInPayroll;

class AddToPayrollService extends Service{
    protected AddToPayroll $payroll;
    protected ListUsersInPayroll $users;

    public function __construct(){
        parent::__construct(false);
        $this->payroll = new AddToPayroll();
        $this->users = new ListUsersInPayroll();
    }
    
    public function process($id){
        Assert::validUuid($id??'', 'User not found.');

        $idObj = new Id();
        $this->payroll->add($idObj->set($id));

        $collector = $this->users->usersInPayroll();

        $this->setOutput($collector);
        return $this;
    }
}