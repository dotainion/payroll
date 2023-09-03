<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\DeleteReportDeduction;
use src\module\report\logic\FetchDeductionReport;

class DeleteDeductionReportService extends Service{
    protected FetchDeductionReport $fetch;
    protected DeleteReportDeduction $deduction;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchDeductionReport();
        $this->deduction = new DeleteReportDeduction();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Deduction not found.');

        $idObj = new Id();
        $idObj->set($id);

        $collector = $this->fetch->deduction($idObj);

        $this->deduction->delete($idObj);

        $this->setOutput($collector);
        return $this;
    }
}