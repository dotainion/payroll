<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\report\repository\AllowanceRepository;
use src\module\report\repository\DeductionRepository;
use src\module\report\repository\LoanAllowanceRepository;
use src\module\report\repository\LoanDeductionRepository;
use src\module\report\repository\NoPayLeaveAllowanceRepository;
use src\module\report\repository\NoPayLeaveDeductionRepository;
use src\module\report\repository\ReportRepository;
use src\module\report\repository\SickLeaveRepository;

class YTDCalculator{
    protected ReportRepository $repo;
    protected AllowanceRepository $repoAllowance;
    protected DeductionRepository $repoDeduction;
    protected LoanAllowanceRepository $repoLoanAllowance;
    protected LoanDeductionRepository $repoLoanDeduction;
    protected SickLeaveRepository $sickLeave;
    protected NoPayLeaveAllowanceRepository $payLeave;
    protected NoPayLeaveDeductionRepository $noPayLeave;

    public function __construct(){
        $this->repo = new ReportRepository();
        $this->repoAllowance = new AllowanceRepository();
        $this->repoDeduction = new DeductionRepository();
        $this->repoLoanAllowance = new LoanAllowanceRepository();
        $this->repoLoanDeduction = new LoanDeductionRepository();
        $this->sickLeave = new SickLeaveRepository();
        $this->payLeave = new NoPayLeaveAllowanceRepository();
        $this->noPayLeave = new NoPayLeaveDeductionRepository();
    }

    private function _startDateTime():string{
        $year = (new DateHelper())->new()->modify('Y');
        return (new DateHelper())->set("$year-01-01 00:00:00")->toString();
    }

    public function calculatedYTD(Id $userId, DateHelper $reportDate):float{
        $collector = $this->repo->listReports([
            'hide' => false,
            'userId' => $userId,
            'from' => $this->_startDateTime(),
            'to' => $reportDate->toString()
        ]);
        $ytd = 0;
        foreach($collector->list() as $report){
            $ytd = $ytd + (float)$report->netSalary();
        }
        return $ytd;
    }

    public function calculateAllowanceYTD(Collector $collector, Id $userId):void{
        foreach($collector->list() as $item){
            $collector = $this->repoAllowance->listAllowances([
                'hide' => false,
                'userId' => $userId,
                'name' => $item->name(),
                'from' => $this->_startDateTime(),
                'to' => $item->date()->toString()
            ]);
            $ytd = 0;
            foreach($collector->list() as $allowance){
                $ytd = $ytd + (float)$allowance->totalAmount();
            }
            $item->setYtd($ytd);
        }
    }

    public function calculateDeductionYTD(Collector $collector, Id $userId):void{
        foreach($collector->list() as $item){
            $collector = $this->repoDeduction->listDeductions([
                'hide' => false,
                'userId' => $userId,
                'name' => $item->name(),
                'from' => $this->_startDateTime(),
                'to' => $item->date()->toString()
            ]);
            $ytd = 0;
            foreach($collector->list() as $deduction){
                $ytd = $ytd + (float)$deduction->totalAmount();
            }
            $item->setYtd($ytd);
        }
    }

    public function calculateLoanAllowanceYTD(Collector $collector, Id $userId):void{
        foreach($collector->list() as $item){
            $collector = $this->repoLoanAllowance->listLoanAllowances([
                'hide' => false,
                'userId' => $userId,
                'name' => $item->name(),
                'from' => $this->_startDateTime(),
                'to' => $item->date()->toString()
            ]);
            $ytd = 0;
            foreach($collector->list() as $loanAllowance){
                $ytd = $ytd + (float)$loanAllowance->amount();
            }
            $item->setYtd($ytd);
        }
    }

    public function calculateLoanDeductionYTD(Collector $collector, Id $userId):void{
        foreach($collector->list() as $item){
            $collector = $this->repoLoanDeduction->listLoanDeductions([
                'hide' => false,
                'userId' => $userId,
                'name' => $item->name(),
                'from' => $this->_startDateTime(),
                'to' => $item->date()->toString()
            ]);
            $ytd = 0;
            foreach($collector->list() as $loanDeduction){
                $ytd = $ytd + (float)$loanDeduction->amount();
            }
            $item->setYtd($ytd);
        }
    }

    public function calculateSickLeaveYTD(Collector $collector, Id $userId):void{
        foreach($collector->list() as $item){
            $collector = $this->sickLeave->listSickLeave([
                'hide' => false,
                'userId' => $userId,
                'name' => $item->name(),
                'from' => $this->_startDateTime(),
                'to' => $item->date()->toString()
            ]);
            $ytd = 0;
            foreach($collector->list() as $sickLeave){
                $ytd = $ytd + (float)$sickLeave->amount();
            }
            $item->setYtd($ytd);
        }
    }

    public function calculatePayLeaveYTD(Collector $collector, Id $userId):void{
        foreach($collector->list() as $item){
            $collector = $this->payLeave->listNopayLeave([
                'hide' => false,
                'userId' => $userId,
                'name' => $item->name(),
                'from' => $this->_startDateTime(),
                'to' => $item->date()->toString()
            ]);
            $ytd = 0;
            foreach($collector->list() as $payLeave){
                $ytd = $ytd + (float)$payLeave->amount();
            }
            $item->setYtd($ytd);
        }
    }

    public function calculateNoPayLeaveYTD(Collector $collector, Id $userId):void{
        foreach($collector->list() as $item){
            $collector = $this->noPayLeave->listNopayLeave([
                'hide' => false,
                'userId' => $userId,
                'name' => $item->name(),
                'from' => $this->_startDateTime(),
                'to' => $item->date()->toString()
            ]);
            $ytd = 0;
            foreach($collector->list() as $noPayLeave){
                $ytd = $ytd + (float)$noPayLeave->amount();
            }
            $item->setYtd($ytd);
        }
    }
}