<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\ListLoanAllowanceByUserReport;

class ListLoanAllowanceReportByUserService extends Service{
    protected ListLoanAllowanceByUserReport $loan;

    public function __construct(){
        parent::__construct();
        $this->loan = new ListLoanAllowanceByUserReport();
    }
    
    public function process($id){
        Assert::validUuid($id, 'User not found.');
        $collector = $this->loan->listByUser((new Id())->set($id));

        $this->setOutput($collector);
        return $this;
    }
}