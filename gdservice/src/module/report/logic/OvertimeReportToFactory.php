<?php
namespace src\module\report\logic;

use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\report\factory\OvertimeFactory;

class OvertimeReportToFactory{
    protected OvertimeFactory $factory;

    public function __construct(){
        $this->factory = new OvertimeFactory();
    }

    public function toFactory(array $sickLeaves, Id $userId, Id $reportId):Collector{
        foreach($sickLeaves as $sick){
            Assert::validUuid($sick['formularId'], 'Overtime settings is required.');
            Assert::stringNotEmpty($sick['name'], 'Overtime name is required.');
            Assert::stringNotEmpty($sick['hours'], 'Overtime hours is required.');
            Assert::stringNotEmpty($sick['amount'], 'Overtime amount is required.');

            $id = new Id();
            $overtime = $this->factory->mapResult([
                'id' => $id->isValid($sick['id']??'') ? $sick['id'] : $id->new()->toString(),
                'reportId' => $reportId->toString(),
                'userId' => $userId->toString(),
                'name' => $sick['name'],
                'hours' => $sick['hours'],
                'amount' => $sick['amount'],
                'formularId' => $sick['formularId'],
                'date' => (new DateHelper())->new()->toString(),
                'hide' => false,
            ]);
            $this->factory->add($overtime);
        }
        return $this->factory;
    }
}