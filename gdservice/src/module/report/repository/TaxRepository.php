<?php
namespace src\module\report\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\report\factory\TaxFactory;
use src\module\report\objects\Tax;

class TaxRepository extends Repository{
    protected TaxFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new TaxFactory();
    }

    public function create(Tax $tax):void{
        $this->insert('taxDeduction')        
            ->add('taxDId', $this->uuid($tax->id()))
            ->add('userId', $this->uuid($tax->userId()))
            ->add('taxDName', $tax->name())
            ->add('taxDDate', $tax->date())
            ->add('taxDAmount', $tax->amount())
            ->add('taxDHide', (int)$tax->hide())
            ->add('taxDReportId', $this->uuid($tax->reportId()));
        $this->execute();
    }
    
    public function edit(Tax $tax):void{
        $this->update('taxDeduction') 
            ->set('userId', $this->uuid($tax->userId()))
            ->set('taxDName', $tax->name())
            ->set('taxDDate', $tax->date())
            ->set('taxDAmount', $tax->amount())
            ->set('taxDHide', (int)$tax->hide())
            ->set('taxDReportId', $this->uuid($tax->reportId()))
            ->where('taxDId', $this->uuid($tax->id()));
        $this->execute();
    }
    
    public function deleteTaxDedution(Id $id):void{
        $this->update('taxDeduction')
            ->set('taxDHide', 1)
            ->where('taxDId', $this->uuid($id));
        $this->execute();
    }

    public function listTaxDedution(array $where=[]):Collector{ 
        $this->select('taxDeduction')
            ->leftJoin('user', 'id', 'taxDeduction', 'userId')
            ->alias('user', 'taxId')
            ->alias('taxDeduction', 'userId', 'taxDName', 'taxDDate', 'taxDAmount', 'taxDHide', 'taxDReportId', 'taxDId');
        if(isset($where['from']) && isset($where['to'])){
            $this->between('taxDDate', $where['from'], $where['to']);
        }
        if(isset($where['reportId'])){
            $this->where('taxDReportId', $this->uuid($where['reportId']));
        }
        if(isset($where['id'])){
            $this->where('taxDId', $this->uuid($where['id']));
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        if(isset($where['name'])){
            $this->where('taxDName', $where['name']);
        }
        if(isset($where['hide'])){
            $this->where('taxDHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}