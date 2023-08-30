<?php
namespace src\module\bank\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\bank\logic\DeleteBankLink;
use src\module\bank\logic\FetchBankLink;

class DeleteBankLinkService extends Service{
    protected DeleteBankLink $bank;
    protected FetchBankLink $fetch;

    public function __construct(){
        parent::__construct();
        $this->bank = new DeleteBankLink();
        $this->fetch = new FetchBankLink();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Bank not found.');

        $idObj = new Id();
        $idObj->set($id);
        
        $collector = $this->fetch->bankById($idObj);

        $this->bank->delete($idObj);

        $this->setOutput($collector);
        return $this;
    }
}