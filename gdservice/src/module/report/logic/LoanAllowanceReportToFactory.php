<?php
namespace src\module\report\logic;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\bank\repository\BankLinkRepository;
use src\module\report\factory\LoanAllowanceFactory;

class LoanAllowanceReportToFactory{
    protected BankLinkRepository $repo;
    protected LoanAllowanceFactory $factory;

    public function __construct(){
        $this->repo = new BankLinkRepository();
        $this->factory = new LoanAllowanceFactory();
    }

    private function _assertBankExist(string $name):bool{
        $collector = $this->repo->listBanks(['name' => $name, 'hide' => false]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Bank not found under this user account.');
        }
        return true;
    }

    public function toFactory(array $loanDeduction, Id $userId, Id $reportId):Collector{
        foreach($loanDeduction as $loan){
            Assert::stringNotEmpty($loan['name'], 'Loan name is required.');
            Assert::stringNotEmpty($loan['number'], 'Loan number is required.');
            Assert::stringNotEmpty($loan['amount'], 'Loan amount is required.');

            $this->_assertBankExist($loan['name']);
            $id = new Id();
            $loanAllowance = $this->factory->mapResult([
                'id' => $id->isValid($loan['id']) ? $loan['id'] : $id->new()->toString(),
                'userId' => $userId->toString(),
                'name' => $loan['name'],
                'date' => (new DateHelper())->toString(),
                'number' => $loan['number'],
                'amount' => $loan['amount'],
                'reportId' => $reportId->toString()
            ]);
            $this->factory->add($loanAllowance);
        }
        return $this->factory;
    }
}