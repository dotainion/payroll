<?php
namespace src\module\report\logic;

use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\report\factory\NoPayLeaveDeductionFactory;

class NoPayLeaveDeductionReportToFactory{
    protected NoPayLeaveDeductionFactory $factory;

    public function __construct(){
        $this->factory = new NoPayLeaveDeductionFactory();
    }

    public function toFactory(array $noPayLeaves, Id $userId, Id $reportId):Collector{
        foreach($noPayLeaves as $nopay){
            Assert::stringNotEmpty($nopay['name'], 'No pay leave name is required.');
            Assert::stringNotEmpty($nopay['amount'], 'No pay leave amount is required.');
            Assert::validDate($nopay['from'], 'No pay leave (from) date is required.');
            Assert::validDate($nopay['to'], 'No pay leave (to) date is required.');

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