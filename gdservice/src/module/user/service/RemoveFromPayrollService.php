<?php
namespace src\module\user\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\user\logic\ListUsersInPayroll;
use src\module\user\logic\RemoveFromPayroll;

class RemoveFromPayrollService extends Service{
    protected RemoveFromPayroll $payroll;
    protected ListUsersInPayroll $users;

    public function __construct(){
        parent::__construct(false);
        $this->payroll = new RemoveFromPayroll();
        $this->users = new ListUsersInPayroll();
    }
    
    public function process($id){
        Assert::validUuid($id??'', 'User not found.');
        
        $idObj = new Id();
        $this->payroll->remove($idObj->set($id));

        $collector = $this->users->usersInPayroll();

        $this->setOutput($collector);
        return $this;
    }
}