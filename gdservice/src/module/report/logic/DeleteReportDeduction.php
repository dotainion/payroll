<?php
namespace src\module\report\logic;

use src\infrastructure\Id;
use src\module\report\repository\DeductionRepository;

class DeleteReportDeduction{
    protected DeductionRepository $repo;

    public function __construct(){
        $this->repo = new DeductionRepository();
    }

    public function delete(Id $id):void{
        $this->repo->deleteDeduction($id);
    }
}