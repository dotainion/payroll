<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\DeleteReportAllowance;
use src\module\report\logic\FetchAllowanceReport;

class DeleteAllowanceReportService extends Service{
    protected FetchAllowanceReport $fetch;
    protected DeleteReportAllowance $allowance;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchAllowanceReport();
        $this->allowance = new DeleteReportAllowance();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Allowance not found.');

        $idObj = new Id();
        $idObj->set($id);
        
        $collector = $this->fetch->allowance($idObj);

        $this->allowance->delete($idObj);

        $this->setOutput($collector);
        return $this;
    }
}