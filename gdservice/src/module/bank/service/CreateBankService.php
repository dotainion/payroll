<?php
namespace src\module\bank\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\bank\factory\BankFactory;
use src\module\bank\logic\CreateBank;

class CreateBankService extends Service{
    protected BankFactory $factory;
    protected CreateBank $bank;

    public function __construct(){
        parent::__construct();
        $this->factory = new BankFactory();
        $this->bank = new CreateBank();
    }
    
    public function process($name){
        Assert::stringNotEmpty($name, 'Bank name is required.');

        $bank = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'hide' => false,
            'name' => $name
        ]);

        $this->bank->create($bank);

        $this->setOutput($bank);
        return $this;
    }
}