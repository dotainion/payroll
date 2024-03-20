<?php
namespace src\module\prorate\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\prorate\repository\ProrateRepository;

class FetchProrate{
    protected ProrateRepository $repo;

    public function __construct(){
        $this->repo = new ProrateRepository();
    }

    public function prorate(Id $id):Collector{
        return $this->repo->listProrate([
            'id' => $id,
            'hide' => false
        ]);
    }

    public function byReportId(Id $id):Collector{
        return $this->repo->listProrate([
            'reportId' => $id,
            'hide' => false
        ]);
    }
}