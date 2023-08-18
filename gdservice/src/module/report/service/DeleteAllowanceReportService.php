<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\DeleteReportAllowance;

class DeleteAllowanceReportService extends Service{
    protected DeleteReportAllowance $allowance;

    public function __construct(){
        parent::__construct();
        $this->allowance = new DeleteReportAllowance();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Allowance not found.');

        $idObj = new Id();
        $idObj->set($id);
        
        $this->allowance->delete($idObj);
        return $this;
    }
}