<?php
namespace src\module\business\logic;

use src\infrastructure\Assert;
use src\module\business\objects\Business;
use src\module\business\repository\BusinessRepository;

class EditBusiness{
    protected BusinessRepository $repo;

    public function __construct(){
        $this->repo = new BusinessRepository();
    }

    public function edit(Business $business):void{
        Assert::emailExist($business->email());
        $this->repo->editBusiness($business);
    }
}