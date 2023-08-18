<?php
namespace src\module\bank\logic;

use src\infrastructure\Id;
use src\module\bank\repository\BankRepository;

class DeleteBank{
    protected BankRepository $repo;

    public function __construct(){
        $this->repo = new BankRepository();
    }
    
    public function delete(Id $id){
        return $this->repo->deleteBank($id);
    }
}