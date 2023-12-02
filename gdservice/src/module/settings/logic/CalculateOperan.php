<?php
namespace src\module\settings\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\IId;
use src\module\settings\objects\Operan;
use src\module\user\logic\FetchUser;
use src\module\user\objects\User;

class CalculateOperan{
    protected FetchUser $fetchUser;
    protected ?User $user = null;

    public function __construct(){
        $this->fetchUser = new FetchUser();
    }

    public function calculateInCollection(Collector &$collector, ?IId $userId):void{
        if($userId !== null){
            $userCollector = $this->fetchUser->user($userId);
            if($userCollector->hasItem()){
                $this->user = $userCollector->first();
            }
        }
        
        foreach($collector->list() as $ot){
            $prefix = $this->_parseValue($ot->prefix());
            $suffix = $this->_parseValue($ot->suffix());

            if($ot->operator()->isMultiply()){
                $ot->setValue($prefix * $suffix);
            }
            if($ot->operator()->isSubtract()){
                $ot->setValue($prefix - $suffix);
            }
            if($ot->operator()->isDivide()){
                $ot->setValue($prefix / $suffix);
            }
        }
    }

    private function _parseValue(Operan &$operan){
        if($operan->isSalary() && $this->user !== null){
            return (float)$this->user->salary();
        }
        if($operan->isCalendar()){
            return (new DateHelper())->new()->daysInMonth();
        }
        if($operan->isNumber()){
            return (float)$operan->value();
        }
        return 0;
    }
}