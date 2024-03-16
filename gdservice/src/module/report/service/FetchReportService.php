<?php
namespace src\module\report\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\FetchReport;

class FetchReportService extends Service{
    protected FetchReport $report;

    public function __construct(){
        parent::__construct();
        $this->report = new FetchReport();
    }
    
    public function process(string $id, ?bool $approved){
        Assert::validUuid($id, 'Report not found.');

        $reportId = new Id();
        $reportId->set($id);

        if($approved === null){
            $approved = true;
        }
        
        $collector = $this->report->report($reportId, $approved);
        (new ReportDependenciesService())->process($collector);

        $this->setOutput($collector);
        return $this;
    }
}