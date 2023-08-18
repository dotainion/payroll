<?php
namespace src\module\business\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\business\factory\BusinessFactory;
use src\module\business\objects\Business;

class BusinessRepository extends Repository{
    protected BusinessFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new BusinessFactory();
    }
    
    public function create(Business $business):void{
        $this->insert('business')        
            ->add('id', $this->uuid($business->id()))
            ->add('name', $business->name())
            ->add('email', $business->email())
            ->add('city', $business->city())
            ->add('state', $business->state())
            ->add('address', $business->address())
            ->add('date', $business->date())
            ->add('hide', (int)$business->hide())
            ->add('isOrganization', $business->isOrganization());
        $this->execute();
    }
    
    public function editBusiness(Business $business):void{
        $this->update('business')        
            ->set('id', $this->uuid($business->id()))
            ->set('name', $business->name())
            ->set('email', $business->email())
            ->set('city', $business->city())
            ->set('state', $business->state())
            ->set('address', $business->address())
            ->set('date', $business->date())
            ->add('hide', (int)$business->hide())
            ->set('isOrganization', $business->isOrganization())
            ->where('id', $this->uuid($business->id()));
        $this->execute();
    }
    
    public function listBusiness(array $where=[]):Collector{
        $this->select('business');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['email'])){
            $this->where('email', $where['email']);
        }
        if(isset($where['hide'])){
            $this->where('hide', (int)$where['hide']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}