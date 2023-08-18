<?php
namespace src\module\bank\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\bank\factory\BankLinkFactory;
use src\module\bank\objects\BankLink;

class BankLinkRepository extends Repository{
    protected BankLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new BankLinkFactory();
    }
    
    public function create(BankLink $bank):void{
        $this->insert('bankLink')   
            ->add('bankLinkId', $this->uuid($bank->id()))
            ->add('bankId', $this->uuid($bank->bankId()))
            ->add('userId', $this->uuid($bank->userId()))
            ->add('bankHide', (int)$bank->hide())
            ->add('bankNumber', $bank->number());
        $this->execute();
    }
    
    public function edit(BankLink $bank):void{
        $this->update('bankLink')       
            ->set('bankId', $this->uuid($bank->bankId())) 
            ->set('userId', $this->uuid($bank->userId()))
            ->set('bankNumber', $bank->number())
            ->set('bankHide', (int)$bank->hide())
            ->where('bankLinkId', $this->uuid($bank->id()));
        $this->execute();
    }
    
    public function listBanks(array $where=[]):Collector{
        $this->select('bankLink')
            ->leftJoin('bank', 'bankId', 'bankLink', 'bankId');

        if(isset($where['id'])){
            $this->where('bankLinkId', $this->uuid($where['id']));
        }
        if(isset($where['bankId'])){
            $this->where('bankId', $this->uuid($where['bankId']));
        }
        if(isset($where['userId'])){
            $this->where('userId', $this->uuid($where['userId']));
        }
        if(isset($where['number'])){
            $this->where('bankNumber', $where['number']);
        }
        if(isset($where['name'])){
            $this->where('bankName', $where['name'], 'bank');
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