<?php
namespace src\module\report\logic;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\report\factory\ReportFactory;
use src\module\report\objects\Report;
use src\module\report\repository\ReportRepository;
use src\module\settings\logic\FetchSickLeave;
use src\module\user\objects\User;

class SetReport{
    protected bool $stopExecution = false;
    protected ReportRepository $repo;
    protected ReportFactory $factory;
    protected SetReportAllowance $setAllowance;
    protected SetReportDeduction $setDeduction;
    protected SetReportLoanAllowance $setLoanAllowance;
    protected SetReportLoanDeduction $setLoanDeduction;
    protected SetReportSickLeave $setSickLeave;
    protected SetReportNoPayLeaveAllowance $setNoPayLeaveAllowance;
    protected SetReportNoPayLeaveDeduction $setNoPayLeaveDeduction;
    protected SetReportOvertime $setOvertime;
    protected FetchSickLeave $settings;
    protected MassDeleteReport $massDelete;

    public function __construct(){
        $this->repo = new ReportRepository();
        $this->factory = new ReportFactory();
        $this->setAllowance = new SetReportAllowance();
        $this->setDeduction = new SetReportDeduction();
        $this->setLoanAllowance = new SetReportLoanAllowance();
        $this->setLoanDeduction = new SetReportLoanDeduction();
        $this->setSickLeave = new SetReportSickLeave();
        $this->setNoPayLeaveAllowance = new SetReportNoPayLeaveAllowance();
        $this->setNoPayLeaveDeduction = new SetReportNoPayLeaveDeduction();
        $this->setOvertime = new SetReportOvertime();
        $this->settings = new FetchSickLeave();
        $this->massDelete = new MassDeleteReport();
    }

    public function stopExecution(bool $stopExecution):void{
        $this->stopExecution = $stopExecution;
    }

    public function create(
        User $user, 
        DateHelper $periodFrom,
        DateHelper $periodTo,
        CalculateReportAllowance $rAllowance, 
        CalculateReportDeduction $rDeduction, 
        CalculateReportLoanAllowance $reportLoanAllowance,
        CalculateReportLoanDeduction $reportLoanDeduction,
        CalculateReportSickLeave $reportSickLeaves,
        CalculateReportNoPayLeaveAllowance $reportNoPayLeaveAllowances,
        CalculateReportNoPayLeaveDeduction $reportNoPayLeaveDeductions,
        CalculateReportOvertime $reportOVertime,
        Id $reportId
    ):Report{
        $totalAllowance = $rAllowance->totalAllowance();
        $totalDeduction = $rDeduction->totalDeduction();

        $totalAllowance = $totalAllowance + $reportLoanAllowance->totalLoanAllowance();
        $totalDeduction = $totalDeduction + $reportLoanDeduction->totalLoanDeduction();

        $totalAllowance = $totalAllowance + $reportNoPayLeaveAllowances->totalNoPayLeaveAllowance();
        $totalDeduction = $totalDeduction + $reportNoPayLeaveDeductions->totalNoPayLeaveDeduction();

        $totalAllowance = $totalAllowance + $reportOVertime->totalOvertime();

        $salary = 0;
        if($reportSickLeaves->hasSickLeave()){
            $salary = $reportSickLeaves->totalSickLeave();
            $settings = $this->settings->settings();
            if($settings->includeSalary()){
                $salary = $salary + ((float)$user->salary());
            }
        }else{
            $salary = (float)$user->salary();
        }

        $report = $this->factory->mapResult([
            'id' => $reportId->toString(),
            'userId' => $user->id()->toString(),
            'date' => (new DateHelper())->new()->toString(),
            'allowance' => $totalAllowance,
            'deduction' => $totalDeduction,
            'salary' => $salary,
            'hide' => $user->hide(),
            'from' => $periodFrom->toString(),
            'to' => $periodTo->toString(),
            'net' => (($salary  + $totalAllowance) - $totalDeduction)
        ]);

        if(!$this->stopExecution){
            $reportCollector = (new FetchReport())->report($report->id());
            if($reportCollector->hasItem()){
                $this->setAllowance->massEdit($rAllowance->reportAllowances(), true);
                $this->setDeduction->massEdit($rDeduction->reportDeductions(), true);

                $this->setLoanAllowance->massEdit($reportLoanAllowance->reportLoanAllowances(), true);
                $this->setLoanDeduction->massEdit($reportLoanDeduction->reporLoanDeductions(), true);

                $this->setSickLeave->massEdit($reportSickLeaves->sickLeaves(), true);

                $this->setNoPayLeaveAllowance->massEdit($reportNoPayLeaveAllowances->noPayLeaveAllowances(), true);
                $this->setNoPayLeaveDeduction->massEdit($reportNoPayLeaveDeductions->noPayLeaveDeductions(), true);

                $this->setOvertime->massEdit($reportOVertime->reportOvertimes(), true);

                $this->repo->edit($report);

                $this->massDelete->massDeleteIfNotIncluded(
                    $report->id(),
                    $rAllowance->reportAllowances(),
                    $rDeduction->reportDeductions(),
                    $reportLoanAllowance->reportLoanAllowances(),
                    $reportLoanDeduction->reporLoanDeductions(),
                    $reportSickLeaves->sickLeaves(),
                    $reportNoPayLeaveAllowances->noPayLeaveAllowances(),
                    $reportNoPayLeaveDeductions->noPayLeaveDeductions(),
                    $reportOVertime->reportOvertimes()
                );
            }else{
                $this->setAllowance->massCreate($rAllowance->reportAllowances());
                $this->setDeduction->massCreate($rDeduction->reportDeductions());

                $this->setLoanAllowance->massCreate($reportLoanAllowance->reportLoanAllowances());
                $this->setLoanDeduction->massCreate($reportLoanDeduction->reporLoanDeductions());

                $this->setSickLeave->massCreate($reportSickLeaves->sickLeaves());

                $this->setNoPayLeaveAllowance->massCreate($reportNoPayLeaveAllowances->noPayLeaveAllowances());
                $this->setNoPayLeaveDeduction->massCreate($reportNoPayLeaveDeductions->noPayLeaveDeductions());

                $this->setOvertime->massCreate($reportOVertime->reportOvertimes());

                $this->repo->create($report);
            }
        }
        $report->setUser($user);
        return $report;
    }
}