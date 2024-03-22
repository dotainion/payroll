<?php
namespace src\module\prorate\logic;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\prorate\factory\ProrateFactory;
use src\module\prorate\objects\Prorate;

class BuildProrate{
    protected ProrateFactory $factory;

    public function __construct(){
        $this->factory = new ProrateFactory();
    }

    public function toFactory(array $prorate, Id $userId, Id $reportId):?Prorate{
        if(!(new DateHelper())->isValid($prorate['from']??'') || !(new DateHelper())->isValid($prorate['to']??'')){
            return null;
        }
        return $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'userId' => $userId->toString(),
            'reportId' => $reportId->toString(),
            'date' => (new DateHelper())->new()->toString(),
            'hide' => false,
            'from' => $prorate['from'],
            'to' => $prorate['to'],
        ]);
    }
}