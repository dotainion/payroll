<?php
namespace src\module\prorate\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\prorate\repository\ProrateRepository;

class ListProrate{
    protected ProrateRepository $repo;

    public function __construct(){
        $this->repo = new ProrateRepository();
    }

    public function byIdArray(array $idArray):Collector{
        if(empty($idArray)){
            return new Collector();
        }
        return $this->repo->listProrate([
            'id' => $idArray,
            'hide' => false
        ]);
    }

    public function byProductId(Id $id):Collector{
        return $this->repo->listProrate([
            'reportId' => $id,
            'hide' => false
        ]);
    }
}