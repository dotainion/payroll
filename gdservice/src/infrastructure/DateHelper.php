<?php
namespace src\infrastructure;

use DateTime;
use DateTimeZone;
use InvalidArgumentException;

class DateHelper
{
    protected string $format = "Y-m-d H:i:s";
    protected DateTime $date;

    public function __toString(){
        return $this->date->format($this->format);
    }

    private function timezone():DateTimeZone{
        return new DateTimeZone('Atlantic/Bermuda');
    }

    public function toString():string{
        return $this->__toString();
    }

    public function new():self{
        $this->date = new DateTime('now', $this->timezone());
        return $this;
    }

    public function modify(string $format):string{
        return $this->date->format($format);
    }

    public function addDays(int $days):self{
        $this->date->modify('+'.$days.' days');
        return $this;
    }

    public function subDays(int $days):self{
        $this->date->modify('-'.$days.' days');
        return $this;
    }

    public function set(string $dateTime):self{
        if(!$this->isValid($dateTime)){
            throw new InvalidArgumentException('Invalid Date Time');
        }
        $this->date = new DateTime($dateTime, $this->timezone());
        return $this;
    }

    public function isValid($dateTime):bool{
        $date = DateTime::createFromFormat($this->format, $dateTime);
        return $date && $date->format($this->format) == $dateTime;
    }

    public function expired(string $dateTime):bool{
        return new DateTime($this->toString(), $this->timezone()) >= new DateTime($dateTime, $this->timezone());
    }

    public function format(){
        return $this->format;
    }

    public function dateTime():DateTime{
        return $this->date;
    }

    public function nullable():string{
        return '0000-00-00 00:00:00';
    }
}

?>