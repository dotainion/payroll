<?php
namespace src\module\allowanceDeductionIdLink\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\allowanceDeductionIdLink\factory\AllowanceDeductionIdLinkFactory;
use src\module\allowanceDeductionIdLink\objects\AllowanceDeductionIdLink;

class AllowanceDeductionIdLinkRepository extends Repository{
    protected AllowanceDeductionIdLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new AllowanceDeductionIdLinkFactory();
    }
    
    public function create(AllowanceDeductionIdLink $option):void{
        $this->insert('allowanceDeductionIdLink')
            ->add('linkId', $this->uuid($option->id()))
            ->add('cmd', $option->cmd());
        $this->execute();
    }
    
    public function edit(AllowanceDeductionIdLink $option):void{
        $this->update('allowanceDeductionIdLink')
            ->set('cmd', $option->cmd())
            ->where('linkId', $this->uuid($option->id()));
        $this->execute();
    }
    
    public function deleteOption(Id $id):void{
        $this->delete('allowanceDeductionIdLink')
            ->where('linkId', $this->uuid($id));
        $this->execute();
    }
    
    public function listOptions(array $where=[]):Collector{
        $this->select('allowanceDeductionIdLink');
        if(isset($where['id'])){
            $this->where('linkId', $this->uuid($where['id']));
        }
        if(isset($where['cmd'])){
            $this->where('cmd', $where['cmd']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}