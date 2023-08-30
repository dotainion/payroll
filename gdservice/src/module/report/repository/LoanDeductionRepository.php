<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\factory\LoanDeductionFactory;
use src\module\report\objects\LoanDeduction;

class LoanDeductionRepository extends Repository{
    protected LoanDeductionFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new LoanDeductionFactory();
    }

    public function create(LoanDeduction $loanDeduction):void{
        $this->insert('reportLoanDeduction')
            ->add('rLDId', $this->uuid($loanDeduction->id()))
            ->add('rLDDate', $loanDeduction->date())
            ->add('rLDHide', (int)$loanDeduction->hide())
            ->add('userId', $this->uuid($loanDeduction->userId()))
            ->add('rLDName', $loanDeduction->name())
            ->add('rLDNumber', $loanDeduction->number())
            ->add('rLDAmount', $loanDeduction->amount())
            ->add('rLDReportId', $this->uuid($loanDeduction->reportId()));
        $this->execute();
    }
    
    public function edit(LoanDeduction $loanDeduction):void{
        $this->update('reportLoanDeduction')        
            ->set('rLDName', $loanDeduction->name())
            ->set('rLDHide', (int)$loanDeduction->hide())
            //->set('rLDDate', $loanDeduction->date())
            ->set('userId', $this->uuid($loanDeduction->userId()))
            ->set('rLDNumber', $loanDeduction->number())
            ->set('rLDAmount', $loanDeduction->amount())
            ->set('rLDReportId', $this->uuid($loanDeduction->reportId()))
            ->where('rLDId', $this->uuid($loanDeduction->id()));
        $this->execute();
    }
    
    public function deleteLoanDeduction(Id $id):void{
        $this->update('reportLoanDeduction')
            ->set('rLDHide', 1)
            ->where('rLDId', $this->uuid($id));
        $this->execute();
    }
    
    public function listLoanDeductions(array $where=[]):Collector{
        $this->select('reportLoanDeduction');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('rLDDate', $where['from'], $where['to']);
        }
        if(isset($where['id'])){
            $this->where('rLDId', $this->uuid($where['id']));
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        if(isset($where['reportId'])){
            $this->where('rLDReportId', $this->uuid($where['reportId']));
        }
        if(isset($where['name'])){
            $this->where('rLDName', $where['name']);
        }
        if(isset($where['hide'])){
            $this->where('rLDHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}