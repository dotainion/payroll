<?php
namespace src\module\deduction\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\deduction\logic\DeleteDeduction;

class DeleteDeductionService extends Service{
    protected DeleteDeduction $deduction;

    public function __construct(){
        parent::__construct();
        $this->deduction = new DeleteDeduction();
    }
    
    public function process($id){
        $this->deduction->delete((new Id())->new($id));
        return $this;
    }
}