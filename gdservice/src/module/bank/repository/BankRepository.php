<?php
namespace src\module\bank\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\bank\factory\BankFactory;
use src\module\bank\objects\Bank;

class BankRepository extends Repository{
    protected BankFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new BankFactory();
    }
    
    public function create(Bank $bank):void{
        $this->insert('bank')        
            ->add('bankId', $this->uuid($bank->id()))
            ->add('bankHide', (int)$bank->hide())
            ->add('bankName', $bank->name());
        $this->execute();
    }
    
    public function edit(Bank $bank):void{
        $this->update('bank')        
            ->set('bankName', $bank->name())
            ->set('bankHide', (int)$bank->hide())
            ->where('bankId', $this->uuid($bank->id()));
        $this->execute();
    }
    
    public function deleteBank(Id $id):void{
        $this->update('bank')     
            ->set('bankHide', 1)   
            ->where('bankId', $this->uuid($id));
        $this->execute();
    }
    
    public function listBanks(array $where=[]):Collector{
        $this->select('bank');
        if(isset($where['name'])){
            $this->where('bankName', $where['name']);
        }
        if(isset($where['id'])){
            $this->where('bankId', $this->uuid($where['id']));
        }
        if(isset($where['hide'])){
            $this->where('bankHide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}