<?php
namespace src\module\mail\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\user\logic\FetchUser;

class SendBulkPayslipMailService extends Service{
    protected FetchUser $user;

    public function __construct(){
        parent::__construct();
        $this->user = new FetchUser();
    }
    
    public function process($payslips){
        foreach($payslips as $payslip){
            $service = (new SendPayslipMailService())->process(
                $payslip['userId'], 
                $payslip['reportId'], 
                $payslip['subject'], 
                $payslip['body']
            );
            $this->mergeOutput($service);
        }
        return $this;
    }
}