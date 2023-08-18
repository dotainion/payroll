<?php
namespace src\module\bank\service;

use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\bank\factory\BankFactory;
use src\module\bank\logic\EditBank;

class EditBankService extends Service{
    protected BankFactory $factory;
    protected EditBank $bank;

    public function __construct(){
        parent::__construct();
        $this->factory = new BankFactory();
        $this->bank = new EditBank();
    }
    
    public function process($id, $name){
        Assert::validUuid($id, 'Bank not found.');
        Assert::stringNotEmpty($name, 'Bank name is required.');

        $bank = $this->factory->mapResult([
            'id' => $id,
            'name' => $name,
            'hide' => false
        ]);

        $this->bank->edit($bank);

        $this->setOutput($bank);
        return $this;
    }
}