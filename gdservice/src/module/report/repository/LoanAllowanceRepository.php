<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\report\factory\LoanAllowanceFactory;
use src\module\report\objects\LoanAllowance;

class LoanAllowanceRepository extends Repository{
    protected LoanAllowanceFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new LoanAllowanceFactory();
    }

    public function create(LoanAllowance $loanAllowance):void{
        $this->insert('reportLoanAllowance')        
            ->add('rLAId', $this->uuid($loanAllowance->id()))
            ->add('rLADate', $loanAllowance->date())
            ->add('rLAHide', (int)$loanAllowance->hide())
            ->add('userId', $this->uuid($loanAllowance->userId()))
            ->add('rLAName', $loanAllowance->name())
            ->add('rLANumber', $loanAllowance->number())
            ->add('rLAAmount', $loanAllowance->amount())
            ->add('rLAReportId', $this->uuid($loanAllowance->reportId()));
        $this->execute();
    }
    
    public function edit(LoanAllowance $loanAllowance):void{
        $this->update('reportLoanAllowance')        
            ->set('rLAName', $loanAllowance->name())
            ->set('rLAHide', (int)$loanAllowance->hide())
            //->set('rLADate', $loanAllowance->date())
            ->set('userId', $this->uuid($loanAllowance->userId()))
            ->set('rLANumber', $loanAllowance->number())
            ->set('rLAAmount', $loanAllowance->amount())
            ->set('rLAReportId', $this->uuid($loanAllowance->reportId()))
            ->where('rLAId', $this->uuid($loanAllowance->id()));
        $this->execute();
    }
    
    public function listLoanAllowances(array $where=[]):Collector{
        $this->select('reportLoanAllowance');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('rLADate', $where['from'], $where['to']);
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        if(isset($where['reportId'])){
            $this->where('rLAReportId', $this->uuid($where['reportId']));
        }
        if(isset($where['name'])){
            $this->where('rLAName', $where['name']);
        }
        if(isset($where['hide'])){
            $this->where('rLAHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}