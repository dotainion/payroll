<?php
namespace src\module\report\logic;

use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\bank\logic\AssertBankExist;
use src\module\report\factory\LoanAllowanceFactory;

class LoanAllowanceReportToFactory{
    protected LoanAllowanceFactory $factory;
    protected AssertBankExist $assertBanks;

    public function __construct(){
        $this->factory = new LoanAllowanceFactory();
        $this->assertBanks = new AssertBankExist();
    }

    private function _assertBankExist(string $name):bool{
        $message = 'Bank name ('.$name.') do not exist.';
        $this->assertBanks->assertBankNameExist($name, $message);
        return true;
    }

    public function toFactory(array $loanDeduction, Id $userId, Id $reportId):Collector{
        foreach($loanDeduction as $loan){
            Assert::stringNotEmpty($loan['name'], 'Loan name is required.');
            Assert::stringNotEmpty($loan['number'], 'Loan number is required. ('.$loan['name'].')');
            Assert::stringNotEmpty($loan['amount'], 'Loan amount is required. ('.$loan['name'].')');

            $this->_assertBankExist($loan['name']);
            $id = new Id();
            $loanAllowance = $this->factory->mapResult([
                'id' => $id->isValid($loan['id']) ? $loan['id'] : $id->new()->toString(),
                'userId' => $userId->toString(),
                'name' => $loan['name'],
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