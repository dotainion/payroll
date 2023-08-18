<?php
namespace src\module\bank\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\bank\factory\BankLinkFactory;
use src\module\bank\logic\CreateBankLink;

class CreateBankLinkService extends Service{
    protected BankLinkFactory $factory;
    protected CreateBankLink $bank;

    public function __construct(){
        parent::__construct();
        $this->factory = new BankLinkFactory();
        $this->bank = new CreateBankLink();
    }
    
    public function process($bankId, $userId, $number){
        Assert::validUuid($bankId, 'Bank not found.');
        Assert::validUuid($userId, 'User not found.');
        Assert::stringNotEmpty($number, 'Bank number is required.');

        $bankLink = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'hide' => false,
            'userId' => $userId,
            'bankId' => $bankId,
            'number' => $number
        ]);

        $this->bank->create($bankLink);

        $this->setOutput($bankLink);
        return $this;
    }
}