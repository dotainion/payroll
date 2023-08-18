<?php
namespace src\module\report\logic;

use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\report\factory\SickLeaveFactory;

class SickLeaveReportToFactory{
    protected SickLeaveFactory $factory;

    public function __construct(){
        $this->factory = new SickLeaveFactory();
    }

    public function toFactory(array $sickLeaves, Id $userId, Id $reportId):Collector{
        foreach($sickLeaves as $sick){
            Assert::stringNotEmpty($sick['name'], 'Loan name is required.');
            Assert::stringNotEmpty($sick['amount'], 'Loan amount is required.');
            Assert::validDate($sick['from'], 'Sick leave (from) date is required.');
            Assert::validDate($sick['to'], 'Sick leave (to) date is required.');

            $id = new Id();
            $sickLeave = $this->factory->mapResult([
                'id' => $id->isValid($sick['id']) ? $sick['id'] : $id->new()->toString(),
                'userId' => $userId->toString(),
                'reportId' => $reportId->toString(),
                'fileId' => (new Id())->new()->toString(),
                'name' => $sick['name'],
                'hide' => false,
                'date' => (new DateHelper())->new()->toString(),
                'from' => (new DateHelper())->set($sick['from'])->toString(),
                'to' => (new DateHelper())->set($sick['to'])->toString(),
                'amount' => $sick['amount'],
            ]);
            $this->factory->add($sickLeave);
        }
        return $this->factory;
    }
}