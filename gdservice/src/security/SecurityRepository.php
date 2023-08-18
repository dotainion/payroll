<?php
namespace src\security;

use src\database\Repository;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\infrastructure\Token;

class SecurityRepository extends Repository{
    protected SecurityFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new SecurityFactory();
    }
    
    public function updateToken(Id $id, Token $token):void{
        $this->update('credential')
            ->set('token', $token->toString());
        $this->where('id', $this->uuid($id));
        $this->execute();
    }
    
    public function removeToken(Id $id):void{
        $this->update('credential')
            ->set('token', '');
        $this->where('id', $this->uuid($id));
        $this->execute();
    }

    public function listBusinessSecurity(array $where = []):Collector{
        $this->select('business')
            ->innerJoin('credential', 'id', 'business', 'id');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['email'])){
            $this->where('email', $where['email']);
        }
        if(isset($where['password'])){
            $this->where('password', $where['password'], 'credential');
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }

    public function listSecurity(array $where = []):Collector{
        $this->select('user')
            ->innerJoin('credential', 'id', 'user', 'id');
        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['email'])){
            $this->where('email', $where['email']);
        }
        if(isset($where['password'])){
            $this->where('password', $where['password'], 'credential');
        }
        $this->execute();

        return $this->factory->map(
            $this->results()
        );
    }
}