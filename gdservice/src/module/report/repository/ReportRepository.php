<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\report\factory\ReportFactory;
use src\module\report\objects\Report;

class ReportRepository extends Repository{
    protected ReportFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ReportFactory();
    }

    public function create(Report $report):void{
        $this->insert('report')
            ->add('reportId', $this->uuid($report->id()))
            ->add('userId', $this->uuid($report->userId()))
            ->add('date', $report->date())
            ->add('hide', (int)$report->hide())
            ->add('totalDeduction', $report->totalDeduction())
            ->add('totalAllowance', $report->totalAllowance())
            ->add('totalSalary', $report->totalSalary())
            ->add('netSalary', $report->netSalary())
            ->add('periodFrom', $report->periodFrom())
            ->add('periodTo', $report->periodTo())
            ->add('approved', $report->approved());
        $this->execute();
    }
    
    public function edit(Report $report):void{
        $this->update('report')        
            ->set('userId', $this->uuid($report->userId()))
            ->set('date', $report->date())
            ->set('hide', (int)$report->hide())
            ->set('totalDeduction', $report->totalDeduction())
            ->set('totalAllowance', $report->totalAllowance())
            ->set('totalSalary', $report->totalSalary())
            ->set('netSalary', $report->netSalary())
            ->set('periodFrom', $report->periodFrom())
            ->set('periodTo', $report->periodTo())
            //->add('approved', $report->approved())
            ->where('reportId', $this->uuid($report->id()));
        $this->execute();
    }
    
    public function approveReport(Array $reportId):void{
        $this->update('report')
            ->set('approved', 1)
            ->where('reportId', $this->uuid($reportId));
        $this->execute();
    }
    
    public function listReports(array $where=[]):Collector{
        $this->select('report');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('date', $where['from'], $where['to']);
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));;
        }
        if(isset($where['reportId'])){
            $this->where('reportId', $this->uuid($where['reportId']));;
        }
        if(isset($where['limit'])){
            $this->limit($where['limit']);
        }
        if(isset($where['hide'])){
            $this->where('hide', (int)$where['hide']);
        }
        if(isset($where['approved'])){
            $this->where('approved', (int)$where['approved']);
        }
        if(isset($where['desc'])){
            $this->orderByDesc('date');
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}