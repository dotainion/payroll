<?php
namespace src\module\report\logic;

use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\report\factory\NoPayLeaveAllowanceFactory;

class NoPayLeaveAllowanceReportToFactory{
    protected NoPayLeaveAllowanceFactory $factory;

    public function __construct(){
        $this->factory = new NoPayLeaveAllowanceFactory();
    }

    public function toFactory(array $noPayLeaves, Id $userId, Id $reportId):Collector{
        foreach($noPayLeaves as $nopay){
            Assert::stringNotEmpty($nopay['name'], 'Pay leave name is required.');
            Assert::stringNotEmpty($nopay['amount'], 'Pay leave amount is required.');
            Assert::validDate($nopay['from'], 'Pay leave (from) date is required.');
            Assert::validDate($nopay['to'], 'Pay leave (to) date is required.');

            $id = new Id();
            $noPayLeave = $this->factory->mapResult([
                'id' => $id->isValid($nopay['id']) ? $nopay['id'] : $id->new()->toString(),
                'userId' => $userId->toString(),
                'reportId' => $reportId->toString(),
                'fileId' => (new Id())->new()->toString(),
                'name' => $nopay['name'],
                'hide' => false,
                'date' => (new DateHelper())->new()->toString(),
                'from' => (new DateHelper())->set($nopay['from'])->toString(),
                'to' => (new DateHelper())->set($nopay['to'])->toString(),
                'amount' => $nopay['amount'],
            ]);
            $this->factory->add($noPayLeave);
        }
        return $this->factory;
    }
}