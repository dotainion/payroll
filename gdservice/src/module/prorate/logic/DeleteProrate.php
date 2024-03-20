<?php
namespace src\module\prorate\logic;

use src\infrastructure\Id;
use src\module\prorate\repository\ProrateRepository;

class DeleteProrate{
    protected ProrateRepository $repo;

    public function __construct(){
        $this->repo = new ProrateRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteProrate($id);
    }
}