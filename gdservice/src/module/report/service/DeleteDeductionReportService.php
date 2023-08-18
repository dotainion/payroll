<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\DeleteReportDeduction;

class DeleteDeductionReportService extends Service{
    protected DeleteReportDeduction $deduction;

    public function __construct(){
        parent::__construct();
        $this->deduction = new DeleteReportDeduction();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Deduction not found.');

        $idObj = new Id();
        $idObj->set($id);

        $this->deduction->delete($idObj);
        return $this;
    }
}