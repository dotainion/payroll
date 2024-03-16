<?php
namespace src\module\user\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\user\factory\UserFactory;
use src\module\user\objects\User;

class UserRepository extends Repository{
    protected UserFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new UserFactory();
    }
    
    public function create(User $user):void{
        $this->insert('user')        
            ->add('id', $this->uuid($user->id()))
            ->add('userId', $user->userId()->toString())
            ->add('name', $user->name())
            ->add('email', $user->email())
            ->add('hide', (int)$user->hide())
            ->add('gender', $user->gender())
            ->add('number', $user->number())
            ->add('salary', $user->salary())
            ->add('dob', $user->dob()->toString())
            ->add('taxId', $user->taxId())
            ->add('nisId', $user->nisId())
            ->add('otRate', $user->otRate())
            ->add('city', $user->city())
            ->add('state', $user->state())
            ->add('address', $user->address())
            ->add('inPayroll', $user->inPayroll())
            ->add('department', $user->department())
            ->add('emergencyNumber', $user->emergencyNumber())
            ->add('registrationDate', $user->registrationDate());
        $this->execute();
    }
    
    public function edit(User $user):void{
        $this->update('user')       
            ->set('userId', $user->userId()->toString()) 
            ->set('name', $user->name())
            ->set('email', $user->email())
            ->set('hide', (int)$user->hide())
            ->set('gender', $user->gender())
            ->set('number', $user->number())
            ->set('salary', $user->salary())
            ->set('dob', $user->dob()->toString())
            ->set('taxId', $user->taxId())
            ->set('nisId', $user->nisId())
            ->set('otRate', $user->otRate())
            ->set('city', $user->city())
            ->set('state', $user->state())
            ->set('address', $user->address())
            //->set('inPayroll', $user->inPayroll())
            ->set('department', $user->department())
            ->set('emergencyNumber', $user->emergencyNumber())
            ->set('registrationDate', $user->registrationDate())
            ->where('id', $this->uuid($user->id()));
        $this->execute();
    }

    public function addToPayroll(Id $id):void{
        $this->update('user')
            ->set('inPayroll', 1)
            ->where('id', $this->uuid($id));
        $this->execute();
    }

    public function removeFromPayroll(Id $id):void{
        $this->update('user')
            ->set('inPayroll', 0)
            ->where('id', $this->uuid($id));
        $this->execute(); 
    }
    
    public function listUsers(array $where=[]):Collector{
        $this->select('user');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['userId'])){
            $this->where('userId', $where['userId']);
        }
        if(isset($where['email'])){
            $this->where('email', $where['email']);
        }
        if(isset($where['hide'])){
            $this->where('hide', (int)$where['hide']);
        }
        if(isset($where['dob'])){
            $this->where('dob', (int)$where['dob']);
        }
        if(isset($where['inPayroll'])){
            $this->where('inPayroll', (int)$where['inPayroll']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}