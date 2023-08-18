<?php
namespace src\module\business\logic;

use src\infrastructure\Collector;
use src\module\business\repository\BusinessRepository;

class FetchBusiness{
    protected BusinessRepository $repo;

    public function __construct(){
        $this->repo = new BusinessRepository();
    }

    public function business():Collector{
        return $this->repo->listBusiness([
            'hide' => false
        ]);
    }
}