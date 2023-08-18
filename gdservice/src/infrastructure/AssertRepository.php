<?php

namespace src\infrastructure;

use src\database\Repository;
use src\module\business\factory\BusinessFactory;
use src\module\user\factory\UserFactory;

class AssertRepository extends Repository{
    public function __construct(){
        parent::__construct();
    }

    public function fetchBusiness(array $where):Collector{
        $this->select('user');
        if(isset($where['email'])){
            $this->where('email', $where['email']);
        }
        if(isset($where['hide'])){
            $this->where('hide', $where['hide']);
        }
        $this->execute();
        return (new UserFactory())->map(
            $this->results()
        );
    }

    public function fetchUser(array $where):Collector{
        $this->select('business');
        if(isset($where['email'])){
            $this->where('email', $where['email']);
        }
        if(isset($where['hide'])){
            $this->where('hide', $where['hide']);
        }
        $this->execute();
        return (new BusinessFactory())->map(
            $this->results()
        );
    }
}
