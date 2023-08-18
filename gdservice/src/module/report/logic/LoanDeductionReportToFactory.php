<?php
namespace src\module\report\logic;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\report\factory\LoanDeductionFactory;
use src\module\report\repository\LoanDeductionRepository;

class LoanDeductionReportToFactory{
    protected LoanDeductionRepository $repo;
    protected LoanDeductionFactory $factory;

    public function __construct(){
        $this->repo = new LoanDeductionRepository();
        $this->factory = new LoanDeductionFactory();
    }

    private function _assertBankExist(string $name):bool{
        $collector = $this->repo->listLoanDeductions(['name' => $name, 'hide' => false]);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Bank not found');
        }
        return true;
    }

    public function toFactory(array $loanAllowance, Id $userId, Id $reportId):Collector{
        foreach($loanAllowance as $loan){
            Assert::stringNotEmpty($loan['name'], 'Loan name is required.');
            Assert::stringNotEmpty($loan['number'], 'Loan number is required.');
            Assert::stringNotEmpty($loan['amount'], 'Loan amount is required.');

            $this->_assertBankExist($loan['name']);

            $id = new Id();
            $loanAllowance = $this->factory->mapResult([
                'id' => $id->isValid($loan['id']) ? $loan['id'] : $id->new()->toString(),
                'userId' => $userId->toString(),
                'name' => $loan['name'],
                'hide' => false,
                'date' => (new DateHelper())->new()->toString(),
                'number' => $loan['number'],
                'amount' => $loan['amount'],
                'reportId' => $reportId->toString()
            ]);
            $this->factory->add($loanAllowance);
        }
        return $this->factory;
    }
}