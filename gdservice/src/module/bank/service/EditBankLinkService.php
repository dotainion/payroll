<?php
namespace src\module\bank\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\bank\factory\BankLinkFactory;
use src\module\bank\logic\EditBankLink;

class EditBankLinkService extends Service{
    protected BankLinkFactory $factory;
    protected EditBankLink $bank;

    public function __construct(){
        parent::__construct();
        $this->factory = new BankLinkFactory();
        $this->bank = new EditBankLink();
    }
    
    public function process($id, $bankId, $userId, $number){
        Assert::validUuid($id, 'Bank not found.');
        Assert::validUuid($bankId, 'Bank not found.');
        Assert::validUuid($userId, 'User not found.');
        Assert::stringNotEmpty($number, 'Bank number is required.');

        $bankLink = $this->factory->mapResult([
            'id' => $id,
            'hide' => false,
            'userId' => $userId,
            'bankId' => $bankId,
            'number' => $number
        ]);

        $this->bank->edit($bankLink);

        $this->setOutput($bankLink);
        return $this;
    }
}