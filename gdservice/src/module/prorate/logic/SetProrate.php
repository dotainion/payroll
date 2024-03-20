<?php
namespace src\module\prorate\logic;

use src\module\prorate\objects\Prorate;
use src\module\prorate\repository\ProrateRepository;

class SetProrate{
    protected ProrateRepository $repo;

    public function __construct(){
        $this->repo = new ProrateRepository();
    }

    public function create(?Prorate $prorate):void{
        $this->repo->create($prorate);
    }

    public function edit(?Prorate $prorate):void{
        $this->repo->edit($prorate);
    }

    public function set(?Prorate $prorate):void{
        if($prorate === null){
            return;
        }
        $collector = $this->repo->listProrate([
            'id' => $prorate->id(),
            'hide' => false
        ]);
        if($collector->hasItem()){
            $this->edit($prorate);
            return;
        }
        $this->create($prorate);
    }
}