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
    protected TaxReportToFactory $taxReport;
    protected SetReportTaxDeduction $setTaxDeduction;
    protected BiMonthlySalary $biMonthly;

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
        $this->taxReport = new TaxReportToFactory();
        $this->setTaxDeduction = new SetReportTaxDeduction();
        $this->biMonthly = new BiMonthlySalary();
    }

    public function execution():bool{
        return $this->stopExecution;
    }

    public function stopExecution(bool $stopExecution):void{
        $this->stopExecution = $stopExecution;
    }

    public function set(
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
        Id $reportId,
        ?bool $notified
    ):Report{
        $totalAllowance = $rAllowance->totalAllowance();
        $totalDeduction = $rDeduction->totalDeduction();

        $totalAllowance = $totalAllowance + $reportLoanAllowance->totalLoanAllowance();
        $totalDeduction = $totalDeduction + $reportLoanDeduction->totalLoanDeduction();

        $totalAllowance = $totalAllowance + $reportNoPayLeaveAllowances->totalNoPayLeaveAllowance();
        $totalDeduction = $totalDeduction + $reportNoPayLeaveDeductions->totalNoPayLeaveDeduction();

        $totalAllowance = $totalAllowance + $reportOVertime->totalOvertime();

        $this->biMonthly->set($user, $periodFrom, $periodTo, $totalAllowance)->calculate();

        $salary = 0;
        if($reportSickLeaves->hasSickLeave()){
            $salary = $reportSickLeaves->totalSickLeave();
            $settings = $this->settings->settings();
            if($settings->includeSalary()){
                $salary = $salary + $this->biMonthly->biMonthlySalary();
            }
        }else{
            $salary = $this->biMonthly->biMonthlySalary();
        }

        //add allowance before tax deduction is subtracted if any.
        $total = $salary  + $this->biMonthly->biMonthlyNetSalary();

        if(!$this->execution()){
            $this->taxReport->initializeTaxDeduction($user, $reportId, $total, $notified);
            $this->taxReport->assertTaxDeduction();
            if($this->taxReport->hasTaxDeduction()){
                $taxDeductionTotal = (float)$this->taxReport->taxDeduction()->amount();
                $totalDeduction = $totalDeduction + $taxDeductionTotal;
                ///$total = $total - $taxDeductionTotal;
            }
        }

        //add deduction after tax deduction was subtracted if any.
        $total = $total - $totalDeduction;

        $report = $this->factory->mapResult([
            'id' => $reportId->toString(),
            'userId' => $user->id()->toString(),
            'date' => (new DateHelper())->new()->toString(),
            'allowance' => $totalAllowance,
            'deduction' => $totalDeduction,
            'salary' => $this->biMonthly->biMonthlyNetSalary(),
            'hide' => $user->hide(),
            'from' => $periodFrom->toString(),
            'to' => $periodTo->toString(),
            'net' => $total
        ]);

        if(!$this->execution()){
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

                if($this->taxReport->hasTaxDeduction()){
                    $this->setTaxDeduction->edit($this->taxReport->taxDeduction());
                }

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

                if($this->taxReport->hasTaxDeduction()){
                    $this->setTaxDeduction->create($this->taxReport->taxDeduction());
                }

                $this->repo->create($report);
            }
        }
        $report->setUser($user);
        return $report;
    }
}