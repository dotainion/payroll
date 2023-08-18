<?php
namespace src\module\business\logic;

use src\infrastructure\Assert;
use src\module\business\objects\Business;
use src\module\business\repository\BusinessRepository;

class CreateBusiness{
    protected BusinessRepository $repo;

    public function __construct(){
        $this->repo = new BusinessRepository();
    }

    public function create(Business $business):void{
        Assert::emailNotExist($business->email());
        $this->repo->create($business);
    }
}